// for babel-plugin-webpack-loaders
const devConfigs = require('./webpack.config');

module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: devConfigs.module.loaders  // remove babel-loader
  }
};
