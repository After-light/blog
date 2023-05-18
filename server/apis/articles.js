const { invert } = require('lodash');
const { getArticlesInfo, getArticlesIdMap, getArticleDetail } = require('../utils');
const { responentModel } = require('../models');

/**
 * 获取文章列表
 * @param {Object} request
 * @param {Object} responent
 * @returns {Object}
 */
module.exports.getArticleList = (_, res) => {
  const articles = getArticlesInfo();
  return res.send({ ...responentModel, data: articles });
};

/**
 * 根据文章id获取文章内容
 * @param {Object} request
 * @param {Object} responent
 * @returns {Object}
 */
module.exports.getArticleById = (req, res) => {
  const { id } = req.params;

  const articlesIdMap = getArticlesIdMap();
  const fileName = invert(articlesIdMap)[id];
  const fileContent = getArticleDetail(fileName);

  res.send({ ...responentModel, data: fileContent });
};
