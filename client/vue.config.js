const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../public"),
  devServer: {
    proxy: {
      "/send/": {
        target: "http://localhost:3000",
      },
    },
  },
};
