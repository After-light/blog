const express = require('express');
const cors = require('cors');

const createRoutes = require('./boot/createRoutes');

const app = express();

function main() {
  app.use(express.static('dist'));
  app.use(cors());

  createRoutes(app);

  app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080}!`)
  );
}

main();

module.exports = app;
