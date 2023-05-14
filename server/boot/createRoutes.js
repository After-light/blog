const apis = require('../apis');

module.exports = function createRoutes(app) {
  apis.forEach(({ type, path, callback }) => {
    app[type](path, callback);
  });
};
