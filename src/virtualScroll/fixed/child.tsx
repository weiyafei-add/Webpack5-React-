import React, { useEffect } from "react";

interface ChildProps {
  count: number;
  num: number;
}

const Child = (props: ChildProps) => {
  useEffect(() => {
    console.log("child render");
  });
  return (
    <div>
      我是子组件{props.count}
      {props.num}
    </div>
  );
};

const propsEqual = (prevProps, nextProps): boolean => {
  console.log(prevProps, nextProps);
  //   返回false则重新渲染
  return false;
};

export default React.memo(Child, propsEqual);
