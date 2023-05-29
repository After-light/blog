const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssLoaderIgnoreList = require('./cssLoaderIgnoreList');

const isDev = process.env.NODE_ENV === 'development';

module.exports = (preProcessor) => {
  return [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          auto: (resourcePath) => {
            // resourcePath:绝对路径
            return !cssLoaderIgnoreList.some((ignore) => resourcePath.includes(ignore));
          },
          localIdentName: '[local]_[hash:base64:10]',
        },
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'postcss-preset-env', // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};
