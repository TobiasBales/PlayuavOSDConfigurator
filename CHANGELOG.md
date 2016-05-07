__PlayUAVOSDConfigurator__

#   (2016-05-07)



---

## Bug Fixes

- make everything work with the current version of react-toolbox (#64)
  ([1167fb96](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/1167fb965acf447d388f43f2367b0b4ed1bb2b6b))
- **config:** reading saved config files
  ([fd4770b9](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/fd4770b9a03e526f96704728179ce2a9cbcafa46))
- **editor:** correct column positioning in the editor
  ([f077b20a](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/f077b20ad7e2e09be3e6ace70c52d039ac7d990b))
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
  - indicate firmware is uploading only after upload started
  ([479a231f](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/479a231f3b21e40217a52f01941b63d02c962b5f))
  - add not implemented yet info to vario graph
  ([b269c6f1](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/b269c6f1ffe0cfd81d4f9b58f7fb1d3fd50c4203))
- **config, preview:** add vario graph
  ([0fa964b1](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/0fa964b16f63641253b6e6e08f5212bec098f52b))
- **pixler:**
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
- **preview:** add icons instead of labels
  ([90cefe8e](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/90cefe8ea1e269ae0c58958a097b836e3012ec1e))
- **preview,config:** add link quality
  ([802de162](git@github.com:TobiasBales/PlayuavOSDConfigurator/commit/802de162850299450f1569297f6760763b28c6ac))


## Documentation

- remove eslint breakage hint
- add link to circle ci linux artifact, add contributing section



---
<sub><sup>*Generated with [git-changelog](https://github.com/rafinskipg/git-changelog). If you have any problem or suggestion, create an issue.* :) **Thanks** </sub></sup>