/* eslint strict: 0 */
'use strict';

const path = require('path');

module.exports = {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css?modules', 'sass'],
      include: path.resolve(__dirname, './node_modules/react-flexbox-grid'),
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css?modules', 'sass'],
      include: path.resolve(__dirname, './node_modules'),
      exclude: path.resolve(__dirname, './node_modules/react-flexbox-grid'),
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [

  ],
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ]
};
