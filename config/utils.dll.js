const webpack = require('webpack');

/**
 * 引入所有dll：读取dll.manifest映射，在浏览器需要时提供对应模块
 * @param {Array} dllManifestFilesPath dll.manifest文件绝对路径的集合
 * @returns
 */
module.exports.createDllReferencePlugins = (dllManifestFilesPath) => {
  return dllManifestFilesPath.map((path) => {
    return new webpack.DllReferencePlugin({
      manifest: require(path),
    });
  });
};

/**
 * 创建AddAssetHtmlPlugin插件的选项，使dll文件插入到html中，配合output-clean在HMR时chunk也能做到持久化缓存
 * @param {Array} dllPaths dll.js文件绝对路径的集合
 * @returns
 */
module.exports.createAddAssetHtmlPluginOptions = (dllPaths) => {
  return dllPaths.map((path) => ({
    filepath: path,
    outputPath: 'dll',
    publicPath: 'dll', // 如果使用多页面应用程序时，可以在多个页面间共享文件
  }));
};
