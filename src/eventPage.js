function startApplication() {
  const applicationStartTime = new Date().getTime();

  chrome.app.window.create('main.html', {
    id: 'main-window',
    frame: 'chrome',
    state: 'maximized',
    innerBounds: {
      minWidth: 700,
      minHeight: 625
    }
  }, (createdWindow) => {
    createdWindow.contentWindow.addEventListener('load', () => {
      // createdWindow.contentWindow.catch_startup_time(applicationStartTime);
    });

    createdWindow.onClosed.addListener(() => {
      // autoamtically close the port when application closes
      // save connectionId in separate variable before createdWindow.contentWindow is destroyed
      const connectionId = createdWindow.contentWindow.serial.connectionId;

      if (connectionId) {
        chrome.serial.disconnect(connectionId, (result) => {
          console.log(`SERIAL: Connection closed - ${result}`);
        });
      }
    });
  });
}

chrome.app.runtime.onLaunched.addListener(startApplication);

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'update') {
    const previousVersionArr = details.previousVersion.split('.');
    const currentVersionArr = chrome.runtime.getManifest().version.split('.');

    if (currentVersionArr[0] > previousVersionArr[0]) {
      chrome.storage.local.get('update_notify', (result) => {
        if (result.update_notify === 'undefined' || result.update_notify) {
          const manifest = chrome.runtime.getManifest();
          const message = chrome.i18n.getMessage(
            'notifications_app_just_updated_to_version', [manifest.version]);
          const buttonTitle = chrome.i18n.getMessage('notifications_click_here_to_start_app');
          const options = {
            priority: 0,
            type: 'basic',
            title: manifest.name,
            message,
            iconUrl: '/images/icon_128.png',
            buttons: [{ title: buttonTitle }]
          };

          chrome.notifications.create('baseflight_update', options, () => {
                // empty
          });
        }
      });
    }
  }
});

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (notificationId === 'baseflight_update') {
    startApplication();
  }
});
