/* eslint no-var: 0, func-names: 0, strict: 0, object-shorthand: 0 */
'use strict';

var webpackConfig = require('./webpack.config.development');
var wallabyWebpack = require('wallaby-webpack');
var webpackPostprocessor = wallabyWebpack(webpackConfig);

module.exports = function (wallaby) {
  return {
    files: [
      { pattern: 'app/**/*.js', load: false }
    ],

    tests: [
      { pattern: 'test/**/*.js', load: false }
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    postprocessor: webpackPostprocessor,

    bootstrap: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
