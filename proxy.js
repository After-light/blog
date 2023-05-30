module.exports = {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    pathRewrite: { '^/api': '' }, // 去掉路径中的/api前缀
  },
};
