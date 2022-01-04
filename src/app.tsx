import React, { useState } from "react";
import "./app.less";

const prefix = "react-app";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div
        className={`${prefix}-container`}
        onClick={() => setCount(count + 1)}
      >
        <span>hello webpack and react{count}</span>
      </div>
    </div>
  );
};

export default App;
