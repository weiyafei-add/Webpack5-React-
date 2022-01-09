const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniSvgDataUri = require("mini-svg-data-uri");
const paths = require("./paths");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const dev = process.env.NODE_ENV === "development";

module.exports = {
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx"],
  },
  entry: {
    main: [paths.src + "/index.tsx"],
  },
  output: {
    path: paths.build,
    filename: "./js/[name]_[contenthash:8]_bundle.js",
    // 静态文件打包后的路径
    assetModuleFilename: "assets/[name]_[contenthash:8][ext]",
    clean: true,
    chunkFilename: "./js/[name]_[contenthash:8]_chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          dev ? "style-loader" : { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "less-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(s?[ca]ss)$/i,
        use: [
          dev ? "style-loader" : { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset",
        generator: {
          filename: "assets/images/[name]_[contenthash:8][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb, (低于8kb会压缩成base64)
          },
        },
      },
      {
        test: /\.svg$/i,
        type: "asset", //用asser/resource会报错
        generator: {
          dataUrl(content) {
            content = content.toString();
            return miniSvgDataUri(content);
          },
        },
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024, // 低于2Kb 会压缩
          },
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset",
        generator: {
          filename: "assets/fonts/[name]_[contenthash:8][ext]",
        },
      },
      // 数据文件
      {
        test: /.(txt|xml)$/i,
        type: "asset/source",
      },
    ],
  },
  optimization: {
    minimizer: ["...", new cssMinimizerWebpackPlugin()], // 此配置将仅在生产环境开启css优化
    // minimize: true  开启此项，开发环境也会优化css
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack template",
      template: paths.src + "/index.html", //template file
      filename: "index.html", // output file
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:8].bundle.css",
    }),
  ],
};
