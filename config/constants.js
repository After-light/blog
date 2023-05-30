const path = require('path');

module.exports.cssLoaderIgnoreList = ['highlight.js'];

// 需要打包成dll库的文件
const DLL_ENTRY = {
  vendor: ['react', 'react-dom'],
  highlight_js: ['highlight.js'],
  rehype_katex: ['rehype-katex'],
};

// 打包后的dll输出路径
const DLL_DIRECTORY = path.resolve(__dirname, '../public/dll');

// dll path
module.exports.DLL_PATHS = Object.keys(DLL_ENTRY).map((fileName) =>
  path.join(DLL_DIRECTORY, `/${fileName}.dll.js`)
);

// dll manifest path
module.exports.DLL_MANIFEST_PATHS = Object.keys(DLL_ENTRY).map((fileName) =>
  path.join(DLL_DIRECTORY, `/${fileName}.manifest.json`)
);

module.exports.DLL_ENTRY = DLL_ENTRY;
module.exports.DLL_DIRECTORY = DLL_DIRECTORY;
