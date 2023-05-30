const fs = require('fs');
const path = require('path');
const moment = require('moment');

const { articleModel } = require('../models');

require('dotenv').config({ path: '.env' });
const { ARTICLES_PATH, ARTICLES_ID_MAP_PATH } = process.env;

/**
 * 获取文章id的Map
 * @returns {Object} { articleId: articleName }
 */
const getArticlesIdMap = () => {
  const articlesAbsolutePath = path.resolve(__dirname, '../../', ARTICLES_ID_MAP_PATH);
  return JSON.parse(fs.readFileSync(articlesAbsolutePath, { encoding: 'utf8' }));
};

/**
 * 获取文章路径 = 文章路径+文章name
 * @param {String} articleName
 * @returns {String} 'D:/xxx/xxx/xxx'
 */
const _getArticlePath = (articleName = '') => {
  const articlesDirPath = path.resolve(__dirname, '../../', ARTICLES_PATH);
  return path.resolve(__dirname, articlesDirPath, articleName);
};

/**
 * 获取文章详情
 * @param {String} articleName
 * @param {String} [line] 获取多少行内容
 * @case1 不带line参数，返回文章title、文章所有内容
 * @case2 带line参数，返回文章title、文章line行内容
 * @returns {Object} { title, content }
 */
const getArticleDetail = (articleName, line) => {
  const articleContent = fs.readFileSync(_getArticlePath(articleName), 'utf8');

  const lines = articleContent.split('\r\n');
  const title = lines[0].replace(/^#|\*/g, '');

  const content = !line
    ? lines.slice(1).join('\r\n')
    : `${lines
        .filter((e) => e.trim())
        .slice(1, 1 + line)
        .map((e) => e.replace(/#|\*/g, ''))
        .join('\r\n')} ...`;

  return { title, content };
};

/**
 * 获取文章的文件信息
 * @param {String} articleName
 * @returns {Object}
 */
const getArticleStat = (articleName) => {
  const articlePath = _getArticlePath(articleName);

  return fs.statSync(articlePath);
};

/**
 * 获取文章列表
 * @returns {Array} 文章信息列表
 */
const getArticlesInfo = () => {
  // 获取所有文章
  const files = fs.readdirSync(_getArticlePath(), { withFileTypes: true });

  // 获取文章id字典
  const articlesIdMap = getArticlesIdMap();

  return files
    .filter((file) => {
      const stats = getArticleStat(file.name);
      return !stats.isDirectory();
    })
    .map((file) => {
      const { birthtime } = getArticleStat(file.name);
      return {
        ...articleModel,
        id: articlesIdMap[file.name],
        ...getArticleDetail(file.name, 3),
        createTime: (moment(birthtime) || moment()).format('YYYY-MM-DD'),
      };
    });
};

module.exports = {
  getArticlesIdMap,
  getArticlesInfo,
  getArticleDetail,
};
