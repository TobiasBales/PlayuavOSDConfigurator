/* eslint strict: 0 */
'use strict';

const zlib = require('zlib');
const atob = require('atob');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const crashReporter = electron.crashReporter;
const shell = electron.shell;
const SerialPort = require('serialport');
const ipc = electron.ipcMain;
const chokidar = require('chokidar');
const dialog = electron.dialog;
const OSDInterface = require('./app/main/osd_interface');
const menus = require('./app/main/menu');
const fs = require('fs');

let mainWindow = null;

const osdInterface = new OSDInterface();

crashReporter.start();

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 728, icon: 'app/app.png' });

  mainWindow.loadURL(`file://${__dirname}/app/app.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }

  const menuTemplate = menus.getTemplate(app, shell, mainWindow);
  if (process.platform === 'darwin') {
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
  } else {
    const menu = Menu.buildFromTemplate(menuTemplate);
    mainWindow.setMenu(menu);
  }

  const sendSerialPorts = (e) => {
    SerialPort.list((err, ports) => {
      let serialPorts = ports;
      if (err) {
        serialPorts = [];
      }
      if (e.sender && e.sender.send) {
        e.sender.send('serial-ports', serialPorts);
      } else {
        mainWindow.webContents.send('serial-ports', serialPorts);
      }
    });
  };

  chokidar.watch('/dev/ttyACM*').on('all', sendSerialPorts);
  ipc.on('get-serial-ports', sendSerialPorts);

  ipc.on('read-osd', (e, serialPort) => {
    const reportProgress = (progress) => e.sender.send('progress', progress);
    osdInterface.readParameters(serialPort, reportProgress)
      .then(e.sender.send.bind(e.sender, 'osd-config'))
      .catch(e.sender.send.bind(e.sender, 'error'));
  });

  ipc.on('write-osd', (e, serialPort, parameters) => {
    const reportProgress = (progress) => e.sender.send('progress', progress);
    osdInterface.writeParameters(serialPort, parameters, reportProgress)
      .then(e.sender.send.bind(e.sender, 'osd-config-written'))
      .catch(e.sender.send.bind(e.sender, 'error'));
  });

  ipc.on('read-file', (e) => {
    dialog.showOpenDialog({
      defaultPath: './osd_configuration.conf',
      title: 'read config from file',
      filters: [{ name: 'config file', extensions: ['conf'] }],
      properties: ['openFile'],
    }, (files) => {
      if (files && files.length > 0) {
        const filename = files[0];
        fs.readFile(filename, (err, data) => {
          if (err) {
            e.sender.send('error', err);
            return;
          }
          const parameters = JSON.parse(data);
          e.sender.send('osd-file-read', parameters);
        });
      }
    });
  });

  ipc.on('write-file', (e, parameters) => {
    dialog.showSaveDialog({
      defaultPath: 'osd_configuration.conf',
      title: 'save config to file',
      filters: [{ name: 'config file', extensions: ['conf'] }],
      properties: ['openFile', 'createDirectory'],
    }, (filename) => {
      if (filename) {
        fs.writeFile(filename, JSON.stringify(parameters), (err) => {
          if (err) {
            e.sender.send('error', err);
            return;
          }
          e.sender.send('osd-file-written');
        });
      }
    });
  });

  ipc.on('upload-firmware', (e, serialPort) => {
    dialog.showOpenDialog({
      defaultPath: 'osd_configuration.conf',
      title: 'read config from file',
      filters: [{ name: 'firmware file', extensions: ['hex'] }],
      properties: ['openFile'],
    }, (files) => {
      if (files && files.length > 0) {
        const filename = files[0];
        fs.readFile(filename, (err, data) => {
          if (err) {
            e.sender.send('error', err);
            return;
          }
          e.sender.send('firmware-uploading');
          const firmware = JSON.parse(data);
          const binary = atob(firmware.image);
          const buffer = new Buffer(firmware.image.length);
          for (let i = 0; i < buffer.length; i++) {
            buffer[i] = binary.charCodeAt(i);
          }
          firmware.imagebytes = zlib.inflateSync(buffer);
          const reportProgress = (progress) => {
            e.sender.send('progress', progress);
          };

          osdInterface.uploadFirmware(serialPort, firmware, reportProgress)
          .then(e.sender.send.bind(e.sender, 'firmware-uploaded'))
          .catch(e.sender.send.bind(e.sender, 'error'));
        });
      }
    });
  });
});
