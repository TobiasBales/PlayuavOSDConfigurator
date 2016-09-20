/* eslint strict: 0 */
'use strict';

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
const path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'app', 'manifest.json')));

const production = Boolean(process.env.PRODUCTION);

const plugins = production ?
[
  new OccurenceOrderPlugin(),
  new DefinePlugin({
    __DEV__: false,
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    },
    VERSION: JSON.stringify(manifest.version),
  }),
  new UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  }),
  // new ExtractTextPlugin('style.css', { allChunks: true })
] :
[
  new HotModuleReplacementPlugin(),
  new NoErrorsPlugin(),
  new WebpackNotifierPlugin(),
  new DefinePlugin({
    __DEV__: true,
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    },
    VERSION: JSON.stringify(manifest.version),
  })
];

module.exports = {
  debug: !production,
  devTool: production ? 'source-map' : 'cheap-module-eval-source-map',
  entry: {
    index: './src/index',
    eventPage: './src/eventPage',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css?modules', 'sass'],
      include: path.resolve(__dirname, './node_modules'),
    }, {
      test: /\.css$/,
      loaders: ['style', 'css?modules'],
      include: path.resolve(__dirname, './node_modules'),
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.png$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }, {
      test: /\.global\.css$/,
      loaders: ['style-loader', 'css-loader'],
      exclude: path.resolve(__dirname, './node_modules'),
    }, {
      test: /^((?!\.global).)*\.css$/,
      loaders: [
      // ExtractTextPlugin.extract(
        'style-loader',
        production ?
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' :
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      ],
      exclude: path.resolve(__dirname, './node_modules'),
    //   )
    }
  ]
  },
  output: {
    path: path.join(__dirname, 'app', 'dist'),
    filename: '[name].js',
    libraryTarget: 'var',
    publicPath: './dist/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  node: {
    child_process: 'empty',
    fs: 'empty',
    net: 'empty',
  },
  plugins,
  externals: [
  ]
};
