const { getArticleList, getArticleById } = require('./articles');

module.exports = [
  {
    type: 'get',
    path: '/api/getArticleList',
    callback: getArticleList,
  },
  {
    type: 'get',
    path: '/api/getArticleById/:id',
    callback: getArticleById,
  },
];
