const markdown = require('markdown-it')();
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { invert } = require('lodash');

const { articleModel, responentModel } = require('../models');

// 文章id字典路径
const ARTICLES_ID_MAP_PATH = path.resolve(__dirname, '../data/articlesIdMap.json');

// 文章id字典
const ARTICLES_ID_MAP = JSON.parse(fs.readFileSync(ARTICLES_ID_MAP_PATH, { encoding: 'utf8' }));

// 文章所在文件夹路径
const FILE_DIR_PATH = path.join(__dirname, '../data/articles');

/**
 * 获取文章内容信息
 * @param {String} fileContent
 * @returns {Object} { title, content }
 */
const getArticleContentInfo = (fileContent = '') => {
  const lines = fileContent.split('\r\n');

  // 匹配 Markdown 文件的标题和内容，取Markdown内容前5行作为描述
  const title = lines[0].replace(/^#|\*/g, '');
  const content = markdown.render(`${lines.slice(1, 8).join('\r\n').trim()} ...`);

  return { title, content };
};

/**
 * 获取文章列表
 * @param {string} files 所有文章文件
 * @returns {Array} 文章信息列表
 */
const getArticles = (files) => {
  return files.map((file) => {
    const filePath = path.join(FILE_DIR_PATH, file.name);

    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    const fileStat = fs.statSync(filePath);

    return {
      ...articleModel,
      id: ARTICLES_ID_MAP[file.name],
      ...getArticleContentInfo(fileContent),
      createTime: (moment(fileStat.birthtime) || moment()).format('YYYY-MM-DD'),
    };
  });
};

module.exports.getArticleList = (_, res) => {
  const files = fs.readdirSync(FILE_DIR_PATH, { withFileTypes: true });
  const articles = getArticles(files);

  return res.send({ ...responentModel, data: articles });
};

module.exports.getArticleById = (req, res) => {
  const { id } = req.params;

  const fileName = invert(ARTICLES_ID_MAP)[id];
  const filePath = path.join(FILE_DIR_PATH, fileName);

  const fileContent = fs.readFileSync(filePath, 'utf8');
  res.send({ ...responentModel, data: fileContent });
};
