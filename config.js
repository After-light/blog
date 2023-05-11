const path = require("path");

const webpackConfig = require("./config/webpack.config.js");

module.exports = {
  ...webpackConfig,
  resolve: {
    alias: {
      "@@": path.resolve(__dirname, "src/"),
    },
    extensions: [".js", ".jsx"],
  },
};
