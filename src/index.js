import bg from "./assets/img/bg.jpg";
import Svg from "./assets/img/site-logo.svg";
import font1 from "./assets/font/iconfont.ttf";
import { sub } from "./util";
import "./assets/font/iconfont.css";
import "./theme/mixin.less";

function getComponent() {
  return import(/*webpackChunkName: 'loadsh' */ "loadsh").then(
    ({ default: _ }) => {
      const div = document.createElement("div");
      div.innerHTML = _.join(["hello", "webpack"], " ");
      return div;
    }
  );
}

document.addEventListener("click", () => {
  getComponent().then((res) => {
    document.body.appendChild(res);
  });
});
