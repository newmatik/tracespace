'use strict'

const path = require('path')
const {EnvironmentPlugin, ProvidePlugin} = require('webpack')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {merge} = require('webpack-merge')

const pkg = require('./package.json')
const {
  DEV_MODE,
  OUT_DIRNAME,
  baseConfig,
} = require('@tracespace/config/webpack')

const OUT_PATH = path.join(__dirname, OUT_DIRNAME)
const EXAMPLE_OUT = path.join(OUT_PATH, 'arduino-uno.zip')

const EXAMPLE_FILES = path.join(
  path.dirname(require.resolve('@tracespace/fixtures')),
  'boards/arduino-uno/**'
)

module.exports = merge(baseConfig(__dirname), {
  entry: {
    bundle: path.join(__dirname, 'src/index.tsx'),
  },
      output: {
        globalObject: 'this',
        publicPath: './',
      },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.css'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer"),
      "util": require.resolve("util"),
      "assert": require.resolve("assert"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "url": require.resolve("url"),
      "zlib": require.resolve("browserify-zlib"),
      "path": require.resolve("path-browserify"),
      "fs": false,
      "net": false,
      "tls": false
    }
  },
  module: {
    rules: [
      {
        test: /worker\.ts$/i,
        loader: 'worker-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          configFile: path.join(__dirname, '../../babel.config.js'),
        },
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        use: [
          DEV_MODE ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new EnvironmentPlugin({
      MIXPANEL_ID: null,
      PKG_VERSION: pkg.version || '1.0.0',
      PKG_REPOSITORY_URL: pkg.repository?.url || '',
      PKG_AUTHOR_NAME: pkg.author?.name || 'Newmatik',
      PKG_AUTHOR_URL: pkg.author?.url || '',
    }),
    new FileManagerPlugin({
      onStart: {mkdir: [OUT_PATH]},
      onEnd: {archive: [{source: EXAMPLE_FILES, destination: EXAMPLE_OUT}]},
    }),
    new HtmlPlugin({
      template: path.join(__dirname, 'src/template.html'),
      title: pkg.productName || pkg.name,
      author: pkg.author?.name || 'Newmatik',
      description: pkg.description || '',
    }),
  ],
})
