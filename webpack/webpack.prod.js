const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = merge(common, {
  mode: "production",
  devtool: "nosources-source-map", // production
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 100,
      cacheGroups: {
        // 缓存组
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 优先级
          reuseExistingChunk: true, // 如果一个模块被打包过，就不会再打包
          filename: "vendors.js", // 打包后的文件名
        },
        default: {
          // 打包公共模块
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          filename: "common.js",
        },
      },
    },
  },
});
