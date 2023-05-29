const proxy = require('./proxy.js');
const path = require('path');
const { merge } = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'development';
const webpackConfig = isDev
  ? require('./config/webpack.config.dev.js')
  : require('./config/webpack.config.prod');

module.exports = merge(webpackConfig, {
  resolve: {
    alias: {
      '@@': path.resolve(__dirname, 'src/'),
      '@@assets': path.resolve(__dirname, 'src/assets'),
      '@@components': path.resolve(__dirname, 'src/components'),
      '@@layout': path.resolve(__dirname, 'src/layout'),
      '@@share': path.resolve(__dirname, 'src/share'),
    },
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    proxy,
  },
  stats: 'errors-warnings',
});
