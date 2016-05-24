__Playuav OSD Configurator__

#   (2016-05-24)



---

## Bug Fixes

- make everything work with the current version of react-toolbox (#64)
  ([1167fb96](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/1167fb965acf447d388f43f2367b0b4ed1bb2b6b))
- fix lint errors
  ([31462ce2](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/31462ce201326507de979be470f0535f9a32662d))
- fix mocha command in package.json
  ([6bd4abb9](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/6bd4abb99b656e0ec0542661783b2e73df3804cb))
- fix eslint and coding styles
  ([8168fe7e](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/8168fe7e32dcd762e69d8fb4bf7484b57f72716e))
- fix #51, use path.join
  ([76546b55](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/76546b5556d922b7f32b381c0f4ea3a5bc5b7948))
- fix missing comma in package.json after bin
  ([7567bc85](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/7567bc85adfbf83b1a2ff01ea09aafaabf17ec2e))
- fix dispatcher imports
  ([e5a449f8](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/e5a449f88d35b101ea104eabfb54d1e655e20bf0))
- fix hot reload
  ([9596f10a](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/9596f10af317a9863d95a39fd10bf8ec32d6e1c1))
- fix #24, fix defaultProps typo
  ([3a55b91d](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/3a55b91de8ce31bea2f70aa77d4ff9356a7c8409))
- fix #19 making npm scripts cross-platform, and add notice to readme
  ([0c051b7e](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/0c051b7e3e65f41de951d8cfb7819203caa29cb0))
- fix typo
  ([b8d74e37](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/b8d74e37f3171e18807abcc2620bc7ee99f7d0d4))
- **config:**
  - fix writing to osd
  ([9e398053](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/9e3980537069248848625521a20d66b649b90d28))
  - cleanup after the container/component refactoring
  ([bb2d0472](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/bb2d0472495f8faac156fd99ee8eaedb27259703))
  - set state as base when writing to osd
  ([fa23b7da](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/fa23b7dabee4c85832223251bad022f1613ee572))
  - remove duplicate rc5 entry from switching settings
  ([1a99208e](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/1a99208e3e8b430d5aab70c69c0f6a831deebfee))
  - reading saved config files
  ([fd4770b9](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/fd4770b9a03e526f96704728179ce2a9cbcafa46))
- **editor:** correct column positioning in the editor
  ([f077b20a](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/f077b20ad7e2e09be3e6ace70c52d039ac7d990b))
- **eeprom:** fix adding missing values from default eeprom when loading
  ([36a42b0d](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/36a42b0da2bebb2c69d1fde14bb786ae0abcc5f5))
- **icons:**
  - outline inversion when loading data
  ([2a23045e](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/2a23045e146e5ac706ec2e8870481fadb58837fb))
  - correct icon outlines
  ([6dfeeec2](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/6dfeeec29ef8bfa2d84d7b7e5a3ffb93140a86db))
- **main:** remove file watch for /dev/cu.* since it can result in linux issues
  ([ce8d1d5f](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/ce8d1d5f9cf4ccba8f09d9d6c912bc4498c2fa43))
- **pixler:**
  - correct inverted outline handling
  ([c2f2fde7](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/c2f2fde786f8b2d79d999b574904624dc4858202))
  - mirror pixel rendering to match osd/preview
  ([fdbc2402](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/fdbc2402335109d6aec71f785c524ba36bde9edc))
  - correct default outline/shape sizes
  ([afb5d585](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/afb5d585ae61a4dc5cd4422f96c8d5ba379d20db))
  - make output selectable
  ([9a928c23](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/9a928c23843761b8d4c4fcdf2bbb1dcb20fdc1cd))
- **preview:**
  - fix wind preview after canvas refactoring
  ([c3153807](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/c3153807adaeff211eae5ae940873752fd2eba81))
  - fix variograph preview
  ([213caa24](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/213caa24de619b481d7ab2b4a735a0cfe0cdf59e))


## Features

- start configurator in fullscreen mode
  ([3d37cd16](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/3d37cd1661cad0650d982265f2cdd4fcbe1f9cb2))
- **config:**
  - add missing bytes from default eeprom when reading older config file
  ([71d333eb](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/71d333ebb971ae7281da75ae384ba79625a8c626))
  - load default.conf on startup if it exists
  ([d10913d1](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/d10913d1d8328473d1ad575e5b4219c07cf8ced9))
  - indicate firmware is uploading only after upload started
  ([479a231f](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/479a231f3b21e40217a52f01941b63d02c962b5f))
  - add not implemented yet info to vario graph
  ([b269c6f1](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/b269c6f1ffe0cfd81d4f9b58f7fb1d3fd50c4203))
- **config, preview:**
  - add home latitude and longitude
  ([1a051541](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/1a051541395f0351c0c7d8b6e066ac7cf6217a7c))
  - add home direction
  ([d1fa3e25](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/d1fa3e2507d8a5c333cc5c7f49c9c680009bbbe7))
  - add vario graph
  ([0fa964b1](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/0fa964b16f63641253b6e6e08f5212bec098f52b))
- **pixler:**
  - limit and promote byte length when changing fonts
  ([f9b8072a](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/f9b8072a9169d3d9d6e0f7c7e47def5a6981c900))
  - add loading of icons/characters
  ([4263dbe7](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/4263dbe731dd3594a2af0b1eb9f40341d29a1b75))
  - add outline inverting
  ([a6b12630](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/a6b1263023f7c3955d3919dbfcbbaaceecd30f4b))
  - limit pasted outline/shape lengths to font height
  ([0ec68952](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/0ec689523d72cb86151b89eab7cad5d67ca2b698))
  - add preview
  ([e3cc2451](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/e3cc2451c9f00813287f3ab849d0a70d207e2107))
  - add up/down/left/right shifting
  ([b0116938](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/b011693814d67f1d1bb51c1eafad19e3f8caa97d))
  - add font size selection
  ([72cec7a0](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/72cec7a0715beb9c58d4d2b768d4f27da295ac79))
  - add mirror button
  ([feb9ce35](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/feb9ce356ec729d249984cefab25493b5bedda6c))
  - add column/row numbers
  ([9faf01ee](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/9faf01ee178c13522b7ae6b45917484f69aa705b))
  - clear button
  ([3571369b](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/3571369b86d924aa476bc652cf403d74516095d0))
  - allow pasting data to allow reediting previous icons
  ([30bc1793](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/30bc17931f5e97d83606630fc30bd658d5fdb4a3))
  - add basic pixler to design icons
  ([d0ba1b82](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/d0ba1b82d83e92ba9f8eb20293d04a989cc99bdc))
- **preview:**
  - add optional grid overlay
  ([7a7bad2f](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/7a7bad2fbbc69b1287dfae46d6a2af92e8783333))
  - add icons instead of labels
  ([90cefe8e](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/90cefe8ea1e269ae0c58958a097b836e3012ec1e))
- **preview,config:** add link quality
  ([802de162](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/802de162850299450f1569297f6760763b28c6ac))


## Documentation

- remove eslint breakage hint
  ([09780aef](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/09780aefa7bac19894715d79023fd3366840f03d))
- add link to circle ci linux artifact, add contributing section
  ([422ae368](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/422ae368d6dd3713866dfca1c416f32b3cecea45))
- **readme:**
  - add codeclimate badge
  ([caa46e19](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/caa46e1900a24da1f89bab9258b25dd234ae9c08))
  - replace circleci with travis badge
  ([1f6fc736](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/1f6fc736f44bdccdcc903c02b600c8a0129e7338))
  - link to releases for binaries
  ([2ec56c92](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/2ec56c9213af9aed19a22dbfef2c8ceef2689057))
  - add coveralls and circleci badges on top
  ([e9a4bed7](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/e9a4bed718811410bc456bfbff79eb3dc310652e))
  - add missing space for os x build status
  ([82220224](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/822202244b64aafae346ff3ba739d9d971f55466))
  - add info about ndenv
  ([0aa6a29b](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/0aa6a29b617fb23aef7d2b96c6431b49401b6727))
  - add os-x build status badge
  ([f33321bf](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/f33321bf964a70096c7470913f21cb29009f7beb))
  - note that os x is also build by circleci
  ([bf351c9d](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/bf351c9dc393bd0ae802a3e6ab8252077a214008))
  - add link to circleci os x artifacts
  ([c3b14833](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/c3b14833482a1472f6980f2729c782e536ab2068))
  - add feature list for config & pixler
  ([1ab5c81a](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/1ab5c81a8e3f9fcacea9546a8196c0706afa0de2))
  - add circleci status badge
  ([147acf7d](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/147acf7de3845a304d4ac4a0cf862f6ae6d1cdc3))
  - add info about dev server
  ([c8e34a3e](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/c8e34a3e823112e5a85d6bcd34ad37af677a40db))


## Refactor

- move config components/containers etc to app/config/* (#67)
  ([29a8a34d](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/29a8a34d6c5091dbf193fdf4e71786307a2c140f))
- move config reducer/actions to config subfolder
  ([c6fa266d](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/c6fa266dbdb200d2bf57a006882fe995ebf0dbf9))
- **canvas:** make canvas a class and add PreviewBase class
  ([abec8898](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/abec8898a399834c887a91c161a1a17bb1702229))
- **config:** make ParametersModule a container, individual settings components
  ([36411008](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/36411008d7fe1e59890afd22e3c8a24366e31cea))
- **packaging:** use electron-builder instead of electron-packer
  ([ff249749](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/ff249749d4f7d50975b9e33c6b4c6b13009a2d84))
- **preview:**
  - add standalone preview reducer
  ([a32f72bd](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/a32f72bd1f6c10ab8c3e0f9ec3955f7404cf01c7))
  - use same logic as osd for home direction drawing
  ([e494b3c1](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/e494b3c194f9b7ec269266b9428aa82e7c319431))


## Style

- fix most linter warnings
  ([344f38cd](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/344f38cd7dfa2687fcdcd62630cc252e6fff126d))
- **components:** match Text styling to other components
  ([1157c798](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/1157c798073d919b592a7c8b45c497c29d9c40ad))
- **config:** nicer visible on spacing
  ([3dc893bc](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/3dc893bce75805f7fd039a200ecf0c3cb965994a))
- **pixler:**
  - add space between button rows
  ([847d6e53](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/847d6e5386d648346865657d556d8d911f2e8674))
  - fix vertical position of main content
  ([d79df9c3](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/d79df9c36ab0865e71797a911cac23635eb52440))
- **preview:** hide overflowing content
  ([82e4e204](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/82e4e204442d5001a37b09c9d65e493fd14773d6))


## Test

- move setup code to setup.js
  ([48de6076](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/48de60765600db810f9896ba5f946bb58996604e))
- add pixler reducer tests
  ([bdcc9c27](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/bdcc9c271ea6227a6666efc6dd25576995d564f9))
- remove old broken tests
  ([433c9055](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/433c9055ae57962bf5649f2a6d0d7bdad2cce78f))
- **config:** add reducer tests
  ([dbb015d0](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/dbb015d03371403d90884ecf6f454770675dcd56))
- **fonts:** add basic font tests
  ([091061ee](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/091061ee214ae5b840e4850ceb6f51590f121b4c))
- **pixler:**
  - correct reducer name in describe block
  ([4e8f2588](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/4e8f25886581a361d53229b228f18cddbe2e00a4))
  - add missing set_shape reducer test
  ([11f6155e](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/11f6155eb9cb64b74c365cb0938bc67ecafab60e))


## Chore

- use npm to generate changelog
  ([242ecafa](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/242ecafa309d19782c1d2b88e3ba37a671d1805f))
- add validate to precommit hook
  ([37401890](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/3740189040b95c489ce52deaeabb5916734744b9))
- add changelog script
  ([e3e677b3](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/e3e677b32a80bac68b1d630c85cbadd3712669c3))
- **ci:**
  - do not cache node_modules
  ([672a90fb](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/672a90fb34cf6a64e9063c2aa70dcff9ebe7828e))
  - add appveyor.yml
  ([ad3b9907](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/ad3b9907f5b3d8bd6b745a24f480ab5a72ca7c34))
  - add .travis.yml
  ([7b183af3](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/7b183af3da1f50b5b36b6aee4aef13b687adc09b))
  - add codeclimate config plus required other configs
  ([a2739bc2](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/a2739bc2d13f69c74f2a855621a84ae934eab913))
  - add coveralls integration
  ([7c4aa17f](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/7c4aa17f8acd8d0f7b5326a44713ac875a4801f4))
  - configure os x circle ci build
  ([b9bca501](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/b9bca5015f792d9a310c92e1d7c0487b1fde0d1d))
  - install missing libnotify dependency
  ([1daf40d9](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/1daf40d921536056a433f586b1113cf7e0848c94))
  - add npm run test to tasks
  ([7ac3ccfb](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/7ac3ccfba86068cd1286e6ad0d54c0e80fe1efdb))
  - add eslint to ci config
  ([ca220997](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/ca220997dde8d336f9fc3ad4aa49554bcc9567e0))
  - fix ci build and copy linux package to artifacts folder (#62)
  ([38143cf7](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/38143cf70698e06659295eeeb0e9e5f353828f10))
- **cleanup:** remove unused erb-logo
  ([792b3bfe](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/792b3bfe147efba9e660415c72746c8a99d5ed44))
- **config:** remove addPreviewState from reducer
  ([3212afc5](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/3212afc56593748047ed2bf077c2ba9177213ce4))
- **git-hooks:** remove npm ls from precommit hook
  ([6b1a0386](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/6b1a03860ff7c873ae7e60df7fa636f80865a9b1))
- **gitignore:**
  - add default.conf to gitignore
  ([058ad507](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/058ad507ebec85cf67dffaac1653aa9e6f5c20d6))
  - add jshintrc and jshintignore
  ([40337e3a](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/40337e3a7ee0d772369d4e58f9127e120e6e2c0f))
- **icons:** add icon names to icon data
  ([fc7fdb82](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/fc7fdb8205e83a5d428b33feb2a0d42f82e51341))
- **main:** add missing companyName to crashreporter
  ([d8ac317a](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/d8ac317a345c9650dfc1b7c2b1184274e35987a2))
- **node:** rename .node_version to .node-version
  ([f4d1f48d](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/f4d1f48d5bf3a912354daa0fe619ade7cd7319fc))
- **package:**
  - fix all dependencies to concrete versions
  ([c52af529](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/c52af52936a8fb672addd9fc93a5871e39a05315))
  - pin electron-prebuild to 0.36.11 exact
  ([bed76e11](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/bed76e11517bfaf778b0746557d33ed2632e1737))
  - add bluebird dependency
  ([ae0d0c9b](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/ae0d0c9baef701ec488737126432071b11915625))
  - pin node-sass to 3.4.2 to work around a react-toolbox issue
  ([e0d015b1](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/e0d015b1150c1ccaf89071763dbf8d9e233a9140))
  - update eslint and babel-eslint
  ([ea11b1f9](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/ea11b1f9b798d01e3985d23b79ff772be8dac4ad))
  - update react-toolbox to version 0.16.1
  ([64a36279](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/64a3627911e41d3347cdfc29d25ccb34f1c40cfb))
  - update material-design-icons-iconfont to version 2.0.5
  ([ea7e3f30](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/ea7e3f305f53107da87c78200a537217bdd37f53))
  - update atob to version 2.0.3
  ([b80081d1](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/b80081d175d2cbba72c0b8c2cb98881309bfe32b))
  - update react-redux to version 4.4.2
  ([1c0c4aa8](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/1c0c4aa8283cea284aedb35a49cbedccc76eeec7))
  - update react-addons-test-utils to version 15.0.1
  ([f0910491](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/f0910491393bcca0ec3a0a495e35eed4d02d42d5))
  - update react-addons-css-transition-group to version 15.0.1
  ([1e438323](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/1e438323057ef224d91d865f8e6949d81f7352ac))
  - update babel-core to version 6.7.6
  ([01d107d9](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/01d107d9d3798c79af77533ae9f18c348fb7af23))
  - update electron-packager to version 6.0.1
  ([62a1ad03](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/62a1ad030629fd42474ff39da3f51a304af486e0))
- **packages:** update react, electron-packager and depdenencies
  ([b837551d](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/b837551d993b92f3e6dcae2a17f41980b8c519e5))
- **pixler:** add missing key property to column numbers
  ([6790f16f](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/6790f16f76371e3fc64c5dfec15fa50c0178329a))
- **reducers:** transform state to vanilla js objects before logging
  ([a4f81f07](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/a4f81f07930e241fa00b6d3fa1f1884d1c27713c))
- **release:**
  - increase version to 0.3.0
  ([37e02841](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/37e02841546fdaf64fe6d9ab886dbbe96c004a58))
  - v0.2.0
  ([ccf62e2c](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/ccf62e2c1887fbcb4507982887f439f50ae810c2))
- **scripts:** fix test script
  ([e161fedc](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/e161fedc399203449027c2e89cef5c55d5f99987))
- **test, ci:** use mocha junit reporter (#66)
  ([571d8a61](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/571d8a619cbddea30f9c245b293aab63a1bddd8d))


## Branchs merged

- Merge branch 'master' of github.com:ChenTsuLin/electron-react-boilerplate
  ([a74890bb](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/a74890bb06ac748697149c78ee23f6c834868dc0))
- Merge branch 'master' into develop
  ([b0580630](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/b058063049c4fc3c2c3662059146863f61f84804))
- Merge branch 'master' of https://github.com/chentsulin/electron-react-boilerplate
  ([2be35b72](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/2be35b729b2bafaffe84b5e6ebe39e913c5c3d22))
- Merge branch 'develop'
  ([2565dac0](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/2565dac083afb9d2f5f47baaad879dc36223eb8b))
- Merge branch 'develop'
  ([3ad0b86f](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/3ad0b86f6747dcc4d66fcd44146e0ae2e7c9ae63))
- Merge branch 'develop'
  ([6921f4e0](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/6921f4e06f865d40be7e09aa257edbf152c31b55))


## Pull requests merged

- Merge pull request #70 from TobiasBales/icons
  ([3b5402ea](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/3b5402ea54351723b668070b346bbdbf3831b56d))
- Merge pull request #69 from TobiasBales/pixler
  ([f07e2ef9](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/f07e2ef92ac8b65083b19907ddd39af016a7f434))
- Merge pull request #68 from TobiasBales/pixler
  ([d51d6374](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/d51d6374837af00fcedffe97ccf0c63dbc490f9c))
- Merge pull request #65 from TobiasBales/some-tests
  ([c3ee5220](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/c3ee5220656dc820533d2533f6d236d249f03186))
- Merge pull request #63 from TobiasBales/eslint
  ([080367c9](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/080367c91adaf481a4ac43170026edd49842a6e7))
- Merge pull request #21 from TobiasBales/greenkeeper-react-addons-css-transition-group-15.0.1
  ([bf988a72](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/bf988a723eeb53afe652dea2cfd6ce21cac1c765))
- Merge pull request #22 from TobiasBales/greenkeeper-react-addons-test-utils-15.0.1
  ([47d11d99](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/47d11d99e595c6cb2fe2217b215ddf9e7538ff73))
- Merge pull request #23 from TobiasBales/greenkeeper-react-redux-4.4.2
  ([c2d397c1](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/c2d397c1af5617e25176f6a4e3d2963772f07e4c))
- Merge pull request #26 from TobiasBales/greenkeeper-atob-2.0.3
  ([ff86a5a2](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/ff86a5a2a0da5017ec201aebf81a465d3993b972))
- Merge pull request #28 from TobiasBales/greenkeeper-material-design-icons-iconfont-2.0.5
  ([2a63349e](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/2a63349e757c809034027597b00369bbd31ce4da))
- Merge pull request #30 from TobiasBales/greenkeeper-react-toolbox-0.16.1
  ([7f4ba23f](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/7f4ba23fbca46bbb346a7d123129e5a407dc876b))
- Merge pull request #17 from TobiasBales/greenkeeper-babel-core-6.7.6
  ([d069a748](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/d069a74865e307320241f074961d466b87922fb2))
- Merge pull request #15 from TobiasBales/greenkeeper-electron-packager-6.0.1
  ([da953a4e](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/da953a4eec4676efdb46c5639b174e4296f2aecd))
- Merge pull request #174 from jhen0409/patch-14
  ([add50d4b](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/add50d4bfa15b399a3f34831fb257fe0799b4cb3))
- Merge pull request #170 from Yeti-or/master
  ([26d80428](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/26d80428d17a5d3663d4e1df8c7ab51598735477))
- Merge pull request #171 from lmatteis/patch-1
  ([f89d031f](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/f89d031fabf23a11c075338055c17b4ba706257e))
- Merge pull request #167 from chentsulin/feature/redux-logger
  ([f132fe13](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/f132fe1358e8f8d2038619b8a620cb14d26faafb))
- Merge pull request #166 from chentsulin/react-router-redux4
  ([268b56d4](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/268b56d449feaab24fce5cf9cd267b5da1b0c8c0))
- Merge pull request #165 from chentsulin/upgrade-deps
  ([4ee75e56](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/4ee75e56d5108652f1a1a5a8609aaf4a9c8a3d3e))
- Merge pull request #164 from chentsulin/node_env
  ([81458489](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/81458489d18a56f3e4b8e86c54575b47c90f2a7c))
- Merge pull request #161 from davej/feature/remove-hot-dev-app-html
  ([8466f7b5](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/8466f7b5093f2c93564fb559386d532cae3818f8),
   [#160](git@github.com:TobiasBales/PlayuavOSDConfigurator/issues/160))
- Merge pull request #162 from suribit/better-npm-run
  ([e07b5cf6](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/e07b5cf6ca0a0329b30e681f2743cfc33450adac))
- Merge pull request #154 from epilande/css-modules
  ([b0b6f580](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/b0b6f5806ae5c44315838c529a1b6277707ea6c5))
- Merge pull request #150 from ttacon/master
  ([fe74a592](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/fe74a592895c2e3fbd00a9c164425d1282fa95f7))
- Merge pull request #147 from chentsulin/chentsulin-patch-1
  ([74865b4a](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/74865b4a44540e433e4b08f33e8f8122910eef8e))
- Merge pull request #146 from chentsulin/rr2
  ([bc32cdbc](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/bc32cdbcee07a72975c39e710760e95c06526312))
- Merge pull request #145 from chentsulin/chentsulin-patch-1
  ([fa231b00](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/fa231b00e12d0f9c34aa4c04d298b63e6bb977a5))
- Merge pull request #143 from jhen0409/patch-13
  ([681ffb6f](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/681ffb6f04b0ee43c7cf5eb09ab52a50435677b6))
- Merge pull request #135 from jhen0409/patch-10
  ([d4c92590](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/d4c9259034b84c5dff69c3b0a05848cece7528f4))
- Merge pull request #136 from jhen0409/patch-11
  ([b75db1a6](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/b75db1a697d469a8274bf5783d88c0cfc3552310))
- Merge pull request #134 from jhen0409/cross-env
  ([e00d34a5](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/e00d34a59e0873491c72894abcfb921439feb0b4))
- Merge pull request #131 from epilande/master
  ([8816f9a4](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/8816f9a4d0a1c9f01b3eb540dcea009ab2953dee))
- Merge pull request #121 from Kilian/master
  ([6f6ab291](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/6f6ab29157f22882f1c77b22131db800bb8aa2e2))
- Merge pull request #124 from pascalw/bugfix/119-webpack-public-path-production
  ([062260b9](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/062260b97675ebe206d1a8bc816d70295a739c0a))
- Merge pull request #116 from jhen0409/patch-8
  ([a633d523](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/a633d5237c5f648eef91d0cac2687c65c337494d))
- Merge pull request #117 from jhen0409/patch-9
  ([68f3dafb](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/68f3dafbb0a8b5c582cb40b6f4a32849f89c197e))
- Merge pull request #114 from jhen0409/patch-7
  ([8b05e317](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/8b05e317c4ffcc0a6b81bc9426839ad7dfd7fd0b))
- Merge pull request #111 from chentsulin/upgrade-dependencies
  ([4f5745b0](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/4f5745b0ae1c1296e68df29690bff1ae100b6141))
- Merge pull request #113 from jhen0409/patch-6
  ([34ea9959](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/34ea99594a0045583e1b386c03bd40f7a048b260))
- Merge pull request #107 from jhen0409/babel6
  ([64dedc4b](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/64dedc4bd8f6353361f41a9e379e8f9903ceace2))
- Merge pull request #110 from chentsulin/chentsulin-patch-1
  ([9d7c77f3](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/9d7c77f3a97c4a55c2b0830ce631574b814017ca))
- Merge pull request #106 from jhen0409/patch-5
  ([cc3488d2](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/cc3488d256d314f79c250bcf11af3aed31aef595))
- Merge pull request #105 from chentsulin/elctron-0.36
  ([f67b2e9f](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/f67b2e9fd90e0209d805d2d0b1fcd67375b61606))
- Merge pull request #104 from chentsulin/upgrade-redux-devtools3
  ([4cf0acb6](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/4cf0acb6eed65e8f8642fc87cf19eebf29844ec5))
- Merge pull request #102 from chentsulin/disable-debugger-production
  ([6c242bc7](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/6c242bc7eb209a0e3edfa69969b35d147a61644e))
- Merge pull request #101 from chentsulin/upgrade-packager
  ([cce59557](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/cce5955723e3f0b95478f093cdef3246f4c85d27))
- Merge pull request #100 from chentsulin/windows-patch
  ([6dc768d9](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/6dc768d99cd4432077113d4d7d5b9cea9f6ca000))
- Merge pull request #98 from jhen0409/patch-3
  ([b223369e](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/b223369e2d71f8edc42b4c3ab48364f7dca646a4))
- Merge pull request #99 from jhen0409/patch-4
  ([69d2380a](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/69d2380a01cea5a67194653cceb35496902249a5))
- Merge pull request #97 from shea256/master
  ([3f1f69e0](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/3f1f69e0b75f1ecc98ed87daaa8452dccf50afa8))
- Merge pull request #96 from chentsulin/check-dev-engine
  ([cad2b9c1](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/cad2b9c107e6bb1f59abb128d8753311ca00f3ac))
- Merge pull request #95 from chentsulin/chentsulin-patch-1
  ([d8747e20](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/d8747e205cd7e53bf03ce2541ac0e17af6d80657))
- Merge pull request #92 from chentsulin/try-cache-directories
  ([8e2197f9](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/8e2197f9e4beb72e2bd2f71b7be7b84c1a411dab))
- Merge pull request #87 from iDuuck/master
  ([1e27b789](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/1e27b7890a3b3da8af52883d8971321d63317950))
- Merge pull request #91 from chentsulin/node-version-note
  ([c88cac37](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/c88cac3708c1c81019447ebe3eceffd4cd92decc))
- Merge pull request #89 from chentsulin/dev-engines
  ([21219c15](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/21219c151e178ab903df8c6a76df06ebd7ac77c6))
- Merge pull request #86 from chentsulin/update-dependencies
  ([67182ba5](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/67182ba5e62abadb34391d3432f56415158ca840))
- Merge pull request #85 from chentsulin/fix-lint
  ([4c9ec8ca](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/4c9ec8ca7743e34a66bf05eee7210bd709b451ae))
- Merge pull request #84 from chentsulin/node4-es2015
  ([c2829ee9](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/c2829ee91ab60cbcb64c79584b718b439cadd8ee))
- Merge pull request #83 from chentsulin/electron-0.35
  ([d53efecf](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/d53efecf5bd1164f6b7cffe81f0bb15f7ddb8e19))
- Merge pull request #79 from jhen0409/patch-2
  ([64e7e7be](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/64e7e7be90bc4c1d20f0e7713eeea24a379fb4a8))
- Merge pull request #78 from jhen0409/e2e-use-co-mocha
  ([49d5898e](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/49d5898eb428109fa3b05b59457a0b81b31b78af))
- Merge pull request #77 from jhen0409/patch-1
  ([189c18ef](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/189c18ef884daffeeceec924426a5cec164492f3))
- Merge pull request #76 from chentsulin/add-missing-dependency
  ([f042d8f6](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/f042d8f60ca4b4ad5f9802e63cc15739d5af3a5a))
- Merge pull request #74 from vramana/node-env
  ([9b5d42a9](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/9b5d42a95647d3d76f9eb89121a0223ff997725f))
- Merge pull request #71 from pwmckenna/patch-1
  ([ba98ddc4](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/ba98ddc4d7d494c8d008cecc5f53dda88d33f339))
- Merge pull request #72 from pwmckenna/patch-2
  ([dad836cc](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/dad836ccef47444b1ad273e1008337b663483ff9))
- Merge pull request #70 from jhen0409/e2e-test
  ([d967dbc2](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/d967dbc2cfe2b49a217b4361d22712e57421dcd0))
- Merge pull request #69 from chentsulin/unit-tests
  ([0777e63c](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/0777e63c1248ba192e68340c4ba0f8f63e443573))
- Merge pull request #56 from chentsulin/redux
  ([6f1ce543](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/6f1ce543e6e3a9ae3052eb785e53bb58776a29d3))
- Merge pull request #68 from chentsulin/bump-style-n-css-loader
  ([cdb93666](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/cdb93666aaff7ab819a8d7500ccb5b01c671b4c6))
- Merge pull request #66 from chentsulin/cherry-pick-pr65
  ([ce2709fc](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/ce2709fc5c2f2b1f2db1221772a3b9991ca8cead))
- Merge pull request #61 from catalinmiron/60-fix-readme-link-for-react-transform-hmr
  ([e144dc10](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/e144dc10b0281ac4b6171655655f06b9393adca6))
- Merge pull request #59 from RyanAtViceSoftware/Issue57_NODE_ENV
  ([337345d6](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/337345d656ce1d6428a869fe6beee84ded9c18ae))
- Merge pull request #58 from olegakbarov/master
  ([3c3d5561](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/3c3d55613ae05ef27212483a709ca4e78ebc27c6))
- Merge pull request #54 from chentsulin/react-transform
  ([1ddb4d45](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/1ddb4d4597e4d4aa9d5c35e31023ace1aabb5727))
- Merge pull request #53 from chentsulin/test-with-babel
  ([56198f3f](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/56198f3f2b7730aec4db562d15ff407ebd8fa927))
- Merge pull request #52 from chentsulin/path-fix
  ([a867d101](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/a867d101a4ce14db3a174c2be9825541772cf306))
- Merge pull request #50 from chentsulin/simplify-webpack
  ([ed342429](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/ed342429d008ac5f4e511bbe047abad732a27b2c))
- Merge pull request #48 from H3Chief/master
  ([b2ddeb28](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/b2ddeb28b87dfa0194cd174e27afb5fefe54e68b))
- Merge pull request #46 from Producters/master
  ([b8adbbf5](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/b8adbbf5fbd17c5cdb42b10c37604a127a52ae83))
- Merge pull request #41 from tsemerad/master
  ([d8c17210](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/d8c172106bad1cb309efb3566ba613fb35e5478f))
- Merge pull request #38 from chentsulin/develop
  ([511608d3](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/511608d31574f192a03c747914d593d7bc5d5bab))
- Merge pull request #35 from chentsulin/webpack-externals
  ([ba8e48cd](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/ba8e48cd605a7699f5eb41f6f3af45877a7f5d75))
- Merge pull request #34 from ux-dev/placeholder-icon
  ([cb2eba5d](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/cb2eba5d738752387b4720ac5c1810b3cdd16efb))
- Merge pull request #27 from tsemerad/organize-webpack
  ([62995576](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/6299557610ce407f3b24a338aa61077013dd2530))
- Merge pull request #26 from tsemerad/develop
  ([2fd54bc9](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/2fd54bc90f27de600a6c5fb253496f3c3d8f288e))
- Merge pull request #25 from chentsulin/develop
  ([70717d0c](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/70717d0c70ad52a3ccc1cf67be2d51de6174ea0d))
- Merge pull request #22 from chentsulin/develop
  ([9c4856ed](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/9c4856ed490606af3ad9004ad0edf8a6421c28dd))
- Merge pull request #21 from chentsulin/develop
  ([287218be](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/287218be73938fd2c182564116de5b3965f1fbb0))
- Merge pull request #18 from chentsulin/develop
  ([076db0ba](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/076db0bafb6dc2548b867b6deb1f2d224421aeb4))
- Merge pull request #14 from chentsulin/develop
  ([a58b2539](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/a58b253905553ca3d84270c1a9883d1f3e9cdb78))
- Merge pull request #9 from akovalyov/patch-3
  ([ebb7785f](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/ebb7785f40ab9876597461ca6698761f2b5e1573))
- Merge pull request #13 from chentsulin/develop
  ([feaee35f](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/feaee35f8c6c493b81eedbed5f1babd7e1ef18ff))
- Merge pull request #7 from akovalyov/patch-2
  ([90ff4cd4](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/90ff4cd44088eae10776f58e4ee9578fdf6c5bca))
- Merge pull request #11 from chentsulin/develop
  ([29943860](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/2994386096d9aac292961f8bfa0c93ead9f011a5))
- Merge pull request #6 from akovalyov/patch-1
  ([6b3df5dd](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/6b3df5dd44393443e17d34f7450aeb1e50509669))
- Merge pull request #3 from chentsulin/develop
  ([a6071a80](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/a6071a801d2f9c28cb4f03393720d4d77d93d4c3))
- Merge pull request #2 from chentsulin/develop
  ([6fd95572](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/6fd95572c1b47123f0521e1dd6346eaaff266385),
   [#1](git@github.com:TobiasBales/PlayuavOSDConfigurator/issues/1))



---
<sub><sup>*Generated with [git-changelog](https://github.com/rafinskipg/git-changelog). If you have any problems or suggestions, create an issue.* :) **Thanks** </sub></sup>