const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const ARTICLES_PATH = path.resolve(__dirname, '../server/data/articles');
const ARTICLES_ID_MAP_PATH = path.resolve(__dirname, '../server/data/articlesIdMap.json');

const buildArticleIdMap = () => {
  const files = fs.readdirSync(ARTICLES_PATH, { withFileTypes: true });

  return files.reduce((prev, curr) => curr.name && (prev[curr.name] = uuidv4()) && prev, {});
};

const writeMapToFile = (fileContent) => {
  fs.writeFile(ARTICLES_ID_MAP_PATH, JSON.stringify(fileContent), (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('File written successfully!');
    }
  });
};

writeMapToFile(buildArticleIdMap());
