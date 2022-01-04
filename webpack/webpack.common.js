const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const miniSvgDataUri = require("mini-svg-data-uri");
const paths = require("./paths");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx"],
  },
  entry: {
    main: [paths.src + "/index.js"],
  },
  output: {
    path: paths.build,
    filename: "./js/[name]_bundle.js",
    // 静态文件打包后的路径
    assetModuleFilename: "assets/[name]_[hash][ext]",
    clean: true,
    chunkFilename: "./js/[name]_chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
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
          { loader: MiniCssExtractPlugin.loader },
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
          filename: "assets/images/[hash][ext]",
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
          filename: "assets/fonts/[hash][ext]",
        },
      },
      // 数据文件
      {
        test: /.(txt|xml)$/i,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack template",
      template: paths.src + "/index.html", //template file
      filename: "index.html", // output file
    }),
    new MiniCssExtractPlugin(),
  ],
};
