const proxy = require('./proxy.js');
const path = require('path');
const webpackConfig = require('./config/webpack.config.js');

module.exports = {
  ...webpackConfig,
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
    ...webpackConfig.devServer,
    proxy,
  },
};
