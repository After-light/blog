const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(commonConfig, {
  output: {
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  mode: 'development',
  devtool: 'cheap-module-source-map',
});
