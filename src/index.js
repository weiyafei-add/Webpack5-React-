import bg from "./assets/img/bg.jpg";
import Svg from "./assets/img/site-logo.svg";
import font1 from "./assets/font/iconfont.ttf";
import { sub } from "./util";
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

const add = (a, b) => a + b;

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(add(1, 2));
  }, 1000);
});
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(add(2, 2));
  }, 1000);
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(add(3, 4));
  }, 1000);
});

Promise.all([promise1, promise2, promise3]).then((res) => {
  console.log(res);
});

Promise.race([promise1, promise3]).then((res) => {
  console.log(res);
});

const a = [1, 2, 3, 4, 5];
console.log(a.includes(1));
console.log(sub(2, 1));
