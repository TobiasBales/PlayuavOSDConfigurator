/* eslint strict: 0 */
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const app = require('app');
const BrowserWindow = require('browser-window');
const Menu = require('menu');
const crashReporter = require('crash-reporter');
const shell = require('shell');
const SerialPort = require('serialport-electron');
const ipc = require('ipc');
const chokidar = require('chokidar');
const OSDInterface = require('./osd_interface');

let menu;
let template;
let mainWindow = null;

// SerialPort.list(function listCallback(err, ports) {
//   if (err) {
//     throw new Error('Error while listing serial ports: ' + err);
//   }
//   const ct = new CommTool(ports[0].comName);
//   setTimeout(function a() {
//     ct.sync();
//     ct.read(2, function b(data1) {
//       console.log('sync result', data1);
//       ct.getVersion();
//       ct.read(3, function c(data2) {
//         console.log('device result', data2);
//         ct.getParams();
//         ct.read(1024, function d(data3) {
//           console.log('params result', data3.length, data3);
//         });
//       });
//     });
//   }, 550);
// });

let osdInterface = null;

crashReporter.start();

if (process.env.NODE_ENV === 'development') {
  require('./electron-debug')();
}


app.on('window-all-closed', function onAllClosed() {
  if (process.platform !== 'darwin') app.quit();
});


app.on('ready', function onReady() {
  mainWindow = new BrowserWindow({ width: 1024, height: 728 });

  mainWindow.loadUrl(`file://${__dirname}/app/app.html`);

  mainWindow.on('closed', function onClosed() {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }

  if (process.platform === 'darwin') {
    template = [{
      label: 'Electron',
      submenu: [{
        label: 'About ElectronReact',
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: 'Hide ElectronReact',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }]
    }, {
      label: 'View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: 'Reload',
        accelerator: 'Command+R',
        click() {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click() {
          shell.openExternal('http://electron.atom.io');
        }
      }, {
        label: 'Documentation',
        click() {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        }
      }, {
        label: 'Community Discussions',
        click() {
          shell.openExternal('https://discuss.atom.io/c/electron');
        }
      }, {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/atom/electron/issues');
        }
      }]
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O'
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click() {
          mainWindow.close();
        }
      }]
    }, {
      label: '&View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click() {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click() {
          shell.openExternal('http://electron.atom.io');
        }
      }, {
        label: 'Documentation',
        click() {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        }
      }, {
        label: 'Community Discussions',
        click() {
          shell.openExternal('https://discuss.atom.io/c/electron');
        }
      }, {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/atom/electron/issues');
        }
      }]
    }];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);

    const sendSerialPorts = function sendSerialPorts(e) {
      SerialPort.list(function list(err, ports) {
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

    ipc.on('connect', function onConnect(e, serialPort) {
      if (osdInterface && osdInterface.isOpen()) {
        osdInterface.close();
      }

      const onOpen = function onOpen() {
        e.sender.send('connected');
      };

      const onClose = function onClose() {
        e.sender.send('disconnected');
      };

      osdInterface = new OSDInterface(serialPort, onOpen, onClose);
    });

    ipc.on('disconnect', function onDisconnect() {
      osdInterface.close();
    });

    ipc.on('read-osd', function onReadOSD(e) {
      osdInterface.getParams(function onParameters(err, data) {
        if (err) {
          e.sender.send('error', err);
          osdInterface.close();
          return;
        }
        e.sender.send('osd-config', data);
      });
    });
  }
});
