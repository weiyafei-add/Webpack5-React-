import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import "./index.less";
import Draggable from "react-draggable";
import Child from "./child";
const prefix = "virtual-scroll";

const mockData = new Array(200).fill("").map((item, index) => index + 1);
const itemHeight = 51;

const VirtualDom = () => {
  const [startOffset, setStartOffset] = useState(0);
  const [visibleData, setVisibleData] = useState([]);

  const ref = useRef(null);

  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);
  //   可显示的列表项数
  const visibleCount = (): number => {
    //   1. 容器的高度除以item的高度，就是可以初始容纳的数量；
    return Math.ceil(ref.current.offsetHeight / itemHeight);
  };

  useEffect(() => {
    const sliceData = mockData.slice(0, visibleCount());
    setVisibleData(sliceData);
  }, []);

  const listHeight = useMemo(() => {
    return mockData.length * itemHeight;
  }, []);

  const scrollEvent = () => {
    //   2. 当前滚动位置
    let scrollTop = ref.current.scrollTop;
    //   3. 计算开始截取的位置
    const start = Math.floor(scrollTop / itemHeight);
    const end = start + visibleCount();
    setVisibleData(mockData.slice(start, end));
    setStartOffset(scrollTop - (scrollTop % itemHeight));
  };

  return (
    <div
      className={`${prefix}-container`}
      id="container"
      ref={ref}
      onScroll={scrollEvent}
    >
      <div className={`${prefix}-phantom`} style={{ height: listHeight }}></div>
      <ul
        className={`${prefix}-list`}
        style={{ transform: `translate3d(0, ${startOffset.toString()}px, 0)` }}
      >
        {visibleData.map((item) => {
          return (
            <li key={item} className={`${prefix}-item`}>
              {item}
            </li>
          );
        })}
      </ul>
      {/* <Draggable handle={`strong`} bounds={"parent"}>
        <div className={`${prefix}-head`} onClick={() => setCount(count + 1)}>
          <strong>点我才能拖动</strong>
          <span>点击上面才能拖动哦</span>
        </div>
      </Draggable>
      <Child count={count} num={num} /> */}
    </div>
  );
};

export default VirtualDom;
