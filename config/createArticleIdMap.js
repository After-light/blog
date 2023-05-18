const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config({ path: '.env' });
const { ARTICLES_PATH, ARTICLES_ID_MAP_PATH } = process.env;

const ARTICLES_ABSOLUTE_PATH = path.resolve(__dirname, '../', ARTICLES_PATH);
const ARTICLES_ID_MAP_ABSOLUTE_PATH = path.resolve(__dirname, '../', ARTICLES_ID_MAP_PATH);

const buildArticleIdMap = () => {
  const files = fs.readdirSync(ARTICLES_ABSOLUTE_PATH, { withFileTypes: true });

  return files.reduce((prev, curr) => curr.name && (prev[curr.name] = uuidv4()) && prev, {});
};

const writeMapToFile = (fileContent) => {
  fs.writeFile(ARTICLES_ID_MAP_ABSOLUTE_PATH, JSON.stringify(fileContent), (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('File written successfully!');
    }
  });
};

writeMapToFile(buildArticleIdMap());
