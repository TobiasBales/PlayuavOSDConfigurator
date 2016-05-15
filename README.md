# Playuav OSD Configurator

A simple cross platform tool the playuav osd.

## What does it look like?
![](preview.png)

## Building

    npm install
    npm run package

## Features

#### Config
The part to configure the osd
* change settings
* flash firmware
* write/read settings to osd
* write/read settings to file
* reset settings to default
* load settings from default.conf on startup (located in same directory as executable)

#### Pixler
Helper to make new icons/characters
* Create glyphs for small/medium/large fonts
* mirror image
* invert mask (black/white handling)
* move pixels around in frame

## Binaries
- [Windows](https://www.dropbox.com/s/2t72nirw21kmvap/PlayUAVOSDConfigurator-win32-ia32.zip?dl=0)
- [OS X](https://circleci.com/api/v1/project/TobiasBales/PlayuavOSDConfigurator-OS-X/latest/artifacts/0/$CIRCLE_ARTIFACTS/PlayUAVOSDConfigurator-darwin-x64.zip?branch=master&filter=successful)
- [Linux](https://circleci.com/api/v1/project/TobiasBales/PlayuavOSDConfigurator/latest/artifacts/0/$CIRCLE_ARTIFACTS/PlayUAVOSDConfigurator-linux-x64.zip?branch=master&filter=successful)

![build status](https://circleci.com/gh/TobiasBales/PlayuavOSDConfigurator.png?circle-token=48fc88939139fd5c29f96cfe25e14c412c2dd244&style=shield)

The windows and os x builds are currently done by hand and will most likely be a bit older, linux is the successful build of the master branch

The current hex for the osd can be found the readme of the [repository](https://github.com/TobiasBales/PlayuavOSD) it includes everything that is currently in the master branch.

If anyone knows a nice service for building things on windows/linux/os x and distributing the binaries please let me know @TobiasBales or by mail.

## Contributing

### Development server
    npm run hot-server
    npm run start-hot

### Commit messages, ci, linting etc
- Commit messages should follow the [angular commit message format](https://gist.github.com/stephenparish/9941e89d80e2bc58a153#format-of-the-commit-message)
- Pull requests will be automatically built on circle ci
- Run eslint against your changes (npm run lint)

## Warning
This software comes with no guarantees, it has worked great for me so far but if you blow something up or brick your board, I might be willing to help you but no guarantees.

## Special thanks
Special thanks go to the people who made/make the osd software/hardware and also the amazing people who made the electron-react-boilerplate which made the start of this project so much easier!
