const { getArticleList, getArticleById, getArticleImage } = require('./articles');

module.exports = [
  {
    type: 'get',
    path: '/getArticleList',
    callback: getArticleList,
  },
  {
    type: 'get',
    path: '/getArticleById/:id',
    callback: getArticleById,
  },
  {
    type: 'get',
    path: '/image/:imageDir/:image',
    callback: getArticleImage,
  },
];
