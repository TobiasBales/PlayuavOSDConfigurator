/* eslint strict: 0 */
'use strict';

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

let osdInterface = null;

crashReporter.start();

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 728 });

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

  ipc.on('connect', (e, serialPort) => {
    if (osdInterface && osdInterface.isOpen()) {
      osdInterface.close();
    }

    const onOpen = () => {
      e.sender.send('connected');
    };

    const onClose = () => {
      e.sender.send('disconnected');
    };

    osdInterface = new OSDInterface(serialPort, onOpen, onClose);
  });

  ipc.on('disconnect', () => {
    osdInterface.close();
  });

  ipc.on('read-osd', (e) => {
    osdInterface.getParams((err, data) => {
      if (err) {
        e.sender.send('error', err);
        osdInterface.close();
        return;
      }
      e.sender.send('osd-config', data);
    });
  });

  ipc.on('write-osd', (e, parameters) => {
    osdInterface.setParams(parameters, (err) => {
      if (err) {
        e.sender.send('error', err);
        osdInterface.close();
        return;
      }
      e.sender.send('osd-config-written');
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
});
