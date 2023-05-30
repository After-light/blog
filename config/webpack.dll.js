const path = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const { DLL_ENTRY, DLL_DIRECTORY } = require('./constants');

module.exports = {
  entry: DLL_ENTRY,
  output: {
    path: DLL_DIRECTORY,
    filename: '[name].dll.js',
    library: '[name]_library', // 将 DLL 打包成一个库
  },
  plugins: [
    new webpack.DllPlugin({
      // 定义 DLL 的名称和路径
      path: path.join(DLL_DIRECTORY, '[name].manifest.json'),
      name: '[name]_library',
      entryOnly: true,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin(), // 压缩js
    ],
  },
};
