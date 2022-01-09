const postcssConfig = {
  syntax: "postcss-less",
  plugins: [require("autoprefixer"), "postcss-preset-env"],
};

if (process.env.FILE_TYPE === "mobile") {
  postcssConfig.plugins.push(
    require("postcss-pxtorem")({
      rootValue: 100,
      unitPrecision: 5,
      propList: ["*"],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 2,
    })
  );
}

module.exports = postcssConfig;
