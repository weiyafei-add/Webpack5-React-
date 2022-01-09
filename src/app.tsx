import React, { useState } from "react";
import "./app.less";
import VirtualDom from "./virtualScroll/random";
const prefix = "react-app";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <VirtualDom />
    </div>
  );
};

export default App;
