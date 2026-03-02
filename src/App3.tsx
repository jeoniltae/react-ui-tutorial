import React, { useEffect, useRef, useState } from "react";
import Stopwatch from "./components/StopWatch";
import DebounceSearch from "./components/DebounceSearch";
import TodosPage from "./components/TodosPage";

// 함수 형식
function usePreviousData<T>(data: T) {
  const previousRef = useRef<T>(data);

  useEffect(() => {
    previousRef.current = data;
  }, [data]);

  return previousRef.current;
}

// 변수 형식
// const usePreviousValue = <T extends unknown>(value: T) => {
const usePreviousValue = <T,>(value: T) => {
  const previousRef = useRef<T>(value);

  useEffect(() => {
    previousRef.current = value;
  }, [value]);

  return previousRef.current;
};

const App3 = () => {
  const [count, setCount] = useState(0);
  const previousCount = usePreviousData(count);
  console.log("previousCount: ", previousCount);

  return (
    <div>
      <button
        onClick={() => {
          // countRef.current = countRef.current + 1;
          // console.log(countRef.current);
          setCount((prev) => {
            // countRef.current = prev;
            // console.log("countRef.current:", countRef.current);
            return prev + 1;
          });
        }}
      >
        버튼{count}
      </button>

      {/* <Stopwatch /> */}
      {/* <DebounceSearch /> */}
      <TodosPage />
    </div>
  );
};

export default App3;
