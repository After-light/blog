const getArticles = require('./articles');

module.exports = [
  {
    type: 'get',
    path: '/api/getArticles',
    callback: getArticles,
  },
];
