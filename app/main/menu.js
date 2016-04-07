/* eslint strict: 0 */
'use strict';

function getTemplate(app, shell, mainWindow) {
  let template = null;
  if (process.platform === 'darwin') {
    template = [{
      label: 'Electron',
      submenu: [{
        label: 'About Playuav OSD Configurator',
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        type: 'separator'
      }, {
        label: 'Hide Playuav OSD Configurator',
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
      label: 'Help',
      submenu: [{
        label: 'Playuav OSD wiki',
        click() {
          shell.openExternal('http://www.playuav.com/wiki/doku.php?id=projects:playuavosd:start');
        }
      }, {
        label: 'Playuav OSD homepage/forum',
        click() {
          shell.openExternal('http://en.playuav.com/');
        }
      }, {
        label: 'Playuav OSD Configurator issues',
        click() {
          shell.openExternal('https://github.com/TobiasBales/PlayuavOSDConfigurator');
        }
      }, {
        label: 'Playuav OSD Configurator sources',
        click() {
          shell.openExternal('https://github.com/TobiasBales/PlayuavOSDConfigurator');
        }
      }]
    }];
  } else {
    template = [{
      label: '&File',
      submenu: [{
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
        label: 'Playuav OSD wiki',
        click() {
          shell.openExternal('http://www.playuav.com/wiki/doku.php?id=projects:playuavosd:start');
        }
      }, {
        label: 'Playuav OSD homepage/forum',
        click() {
          shell.openExternal('http://en.playuav.com/');
        }
      }, {
        label: 'Playuav OSD Configurator issues',
        click() {
          shell.openExternal('https://github.com/TobiasBales/PlayuavOSDConfigurator');
        }
      }, {
        label: 'Playuav OSD Configurator sources',
        click() {
          shell.openExternal('https://github.com/TobiasBales/PlayuavOSDConfigurator');
        }
      }]
    }];
  }
  return template;
}

module.exports = {
  getTemplate,
};
