module.exports = {
  '/api': {
    pathRewrite: { '^/api': '' }, // 去掉路径中的/api前缀
    changeOrigin: true, // 更改源地址
  },
};
