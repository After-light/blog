const path = require('path');
const webpack = require('webpack');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const createStyleLoaders = require('./createStyleLoaders');

// 需要通过 cross-env 定义环境变量
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/',
    clean: {
      keep: (asset) => {
        return asset.includes('static/dll');
      },
    },
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左，从下到上
            use: createStyleLoaders(),
          },
          {
            test: /\.less$/,
            use: createStyleLoaders('less-loader'),
          },
          {
            test: /\.s[ac]ss$/,
            use: createStyleLoaders('sass-loader'),
          },
          {
            test: /\.styl$/,
            use: createStyleLoaders('stylus-loader'),
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 8192,
              },
            },
            generator: {
              filename: 'static/images/[name][ext]',
            },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: 'asset/resource',
          },
          {
            test: /\.(jsx|js)$/,
            include: path.resolve(__dirname, '../src'),
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 缓存文件不要压缩
              plugins: [isDev && 'react-refresh/babel'].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(path.join(__dirname, '../dist/static/dll/vendor.manifest.json')),
    }),
    new webpack.DllReferencePlugin({
      manifest: require(path.join(__dirname, '../dist/static/dll/highlight_js.manifest.json')),
    }),
    new webpack.DllReferencePlugin({
      manifest: require(path.join(__dirname, '../dist/static/dll/rehype_katex.manifest.json')),
    }),
    new AddAssetHtmlPlugin([
      { filepath: path.resolve(__dirname, '../dist/static/dll/vendor.dll.js') },
      { filepath: path.resolve(__dirname, '../dist/static/dll/highlight_js.dll.js') },
      { filepath: path.resolve(__dirname, '../dist/static/dll/rehype_katex.dll.js') },
    ]),
    new ESLintWebpackPlugin({
      extensions: ['.js', '.jsx'],
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
    }),
    // 配合HtmlWebpackPlugin一起使用的，允许index.html中使用变量
    new InterpolateHtmlPlugin({
      PUBLIC_URL: 'public',
    }),
    // new BundleAnalyzerPlugin(),
  ].filter(Boolean),

  devServer: {
    open: true,
    host: 'localhost',
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true, // 解决路由路径刷新后404问题
  },
};
