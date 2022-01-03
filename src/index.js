import bg from "./assets/img/bg.jpg";
import Svg from "./assets/img/site-logo.svg";
import font1 from "./assets/font/iconfont.ttf";

import "./assets/font/iconfont.css";
import "./theme/mixin.less";

const reset = require("./assets/font/iconfont.css");
console.log(reset);
const div = document.createElement("div");
div.innerHTML += `<i class='letao-iconfont-pc iconbofang1'>我是</i>`;
document.body.append(div);

const global = require("./theme/global.scss");
console.log("scss", global);

const dom = document.getElementById("root");
const img = new Image();
img.src = bg;
img.classList.add("avatar");
dom.appendChild(img);
