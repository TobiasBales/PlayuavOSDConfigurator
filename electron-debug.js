'use strict';
const localShortcut = require('./electron-localshortcut');
const app = require('app');
const BrowserWindow = require('browser-window');
const isOSX = process.platform === 'darwin';

function devTools(win) {
	win = win || BrowserWindow.getFocusedWindow();

	if (win) {
		win.toggleDevTools();
	}
}

function refresh(win) {
	win = win || BrowserWindow.getFocusedWindow();

	if (win) {
		win.webContents.reloadIgnoringCache();
	}
}

module.exports = function(opts) {
	opts = opts || {};

	app.on('browser-window-created', function(e, win) {
		if (opts.showDevTools) {
			devTools(win);
		}
	});

	app.on('ready', function() {
		localShortcut.register(isOSX ? 'Cmd+Alt+I' : 'Ctrl+Shift+I', devTools);
		localShortcut.register('F12', devTools);

		localShortcut.register('CmdOrCtrl+R', refresh);
		localShortcut.register('F5', refresh);
	});
};

module.exports.refresh = refresh;
module.exports.devTools = devTools;
