const path = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
    highlight_js: ['highlight.js'],
    rehype_katex: ['rehype-katex'],
  },
  output: {
    path: path.resolve(__dirname, '../dist/static/dll'),
    filename: '[name].dll.js',
    // 将 DLL 打包成一个库
    library: '[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      // 定义 DLL 的名称和路径
      path: path.join(__dirname, '../dist/static/dll', '[name].manifest.json'),
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
