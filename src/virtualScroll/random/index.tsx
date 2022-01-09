import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  ReactChildren,
  ReactHTMLElement,
} from "react";
import faker from "faker";
import "./index.less";

const prefix = "virtual-scroll";

const mockData = new Array(2000)
  .fill("")
  .map((item, index) => ({ id: index, value: faker.lorem.sentences() }));
const itemHeight = 51;

const VirtualDom = () => {
  const [startOffset, setStartOffset] = useState(0);
  const [visibleData, setVisibleData] = useState([]);
  const [position, setPosition] = useState(() => {
    return mockData.map((item, index) => ({
      index,
      height: itemHeight,
      top: index * itemHeight,
      bottom: (index + 1) * itemHeight,
    }));
  });
  const containerRef = useRef(null);
  const listWrapRef = useRef(null);

  //   列表总的高度
  const listHeight = useMemo(() => {
    return position[position.length - 1].bottom;
  }, []);

  //   可显示的列表项数
  const visibleCount = (): number => {
    //   1. 容器的高度除以item的高度，就是可以初始容纳的数量；
    return Math.ceil((containerRef.current as any).offsetHeight / itemHeight);
  };

  const updateItemsSize = () => {
    let nodes: HTMLElement[] = Array.from(
      (listWrapRef.current as any).children
    );
    nodes.forEach((node) => {
      let rect = node.getBoundingClientRect();
      let height = rect.height;
      let index = Number(node.id);
      let oldHeight = position[index].height;
      let dValue = oldHeight - height;
      if (dValue) {
        position[index].bottom = position[index].bottom - dValue;
        position[index].height = height;
        for (let k = index + 1; k < position.length; k++) {
          position[k].top = position[k - 1].bottom;
          position[k].bottom = position[k].bottom - dValue;
        }
      }
    });
    setPosition([...position]);
  };

  const scrollEvent = () => {
    //   2. 当前滚动位置
    let scrollTop = containerRef.current.scrollTop;
    //   3. 计算开始截取的位置
    let start = getStartIndex(scrollTop);
    let end = start + visibleCount();
    const sliceDate = mockData.slice(start, end);
    setVisibleData(sliceDate);
    let startOffset = start >= 1 ? position[start].top : 0;
    setStartOffset(startOffset);
    updateItemsSize();
  };

  //   二分查找
  const binarySearch = (value): number => {
    let start = 0;
    let end = position.length - 1;
    let tempIndex = null;
    while (start <= end) {
      let midIndex = parseInt(((start + end) / 2).toString()); // 999
      let midValue = position[midIndex].bottom;
      if (midValue === value) {
        return midIndex + 1;
      } else if (midValue < value) {
        start = midIndex + 1;
      } else if (midValue > value) {
        if (tempIndex === null || tempIndex > midIndex) {
          tempIndex = midIndex;
        }
        end = end - 1;
      }
    }
    return tempIndex;
  };

  const getStartIndex = (scrollTop): number => {
    return binarySearch(scrollTop);
  };

  useEffect(() => {
    const sliceData = mockData.slice(0, visibleCount());
    setVisibleData(sliceData);
    updateItemsSize();
  }, []);

  return (
    <div
      className={`${prefix}-container`}
      id="container"
      ref={containerRef}
      onScroll={scrollEvent}
    >
      <div className={`${prefix}-phantom`} style={{ height: listHeight }}></div>
      <ul
        className={`${prefix}-list`}
        style={{ transform: `translate3d(0, ${startOffset.toString()}px, 0)` }}
        ref={listWrapRef}
      >
        {visibleData.map((item) => {
          return (
            <li key={item.id} className={`${prefix}-item`}>
              {item.id} == {item.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VirtualDom;
