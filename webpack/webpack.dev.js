const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
// react有状态刷新
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
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
    open: false,
    compress: true, // 启动gzip压缩
    hot: true,
  },
  plugins: [new ReactRefreshWebpackPlugin()],
});
