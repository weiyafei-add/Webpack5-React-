const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
module.exports = merge(common, {
  devtool: "eval-cheap-module-source-map", // development
  mode: "development",
  optimization: {
    usedExports: true,
  },
  devServer: {
    port: 8686,
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: "/",
    }, // 指定被访问html页面所在目录的路径 webpack5将contentBase替换为static
    open: true,
    compress: true, // 启动gzip压缩
  },
});
