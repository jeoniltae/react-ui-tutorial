import React, { useEffect, useRef, useState } from "react";
import { getRandomHexColor } from "../../App";

const ChildTimerPage = () => {
  const [count, setCount] = useState(5);
  const timerRef = useRef<number | null>(null);

  const countRef = useRef(0);

  useEffect(() => {
    console.log("👏마운트 count: ", count);

    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev < 1) {
          clearInterval(timerRef.current!);
          console.log("❌❌타이머 지움: ", timerRef.current);
          countRef.current = 0;
          return 0;
        }

        const value = prev - 1;
        countRef.current = value;
        return value;
      });
      console.log(
        `🕐인터벌 count: ${count} / ⌚countRef.current: ${countRef.current}`
      );
    }, 1000);

    return () => {
      console.log("❌언마운트 count: ", count);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        console.log("❌❌타이머 지움: ", timerRef.current);
      }
    };
  }, []);

  console.log("🥇자식 랜더링 count: ", count);

  return (
    <div
      style={{ padding: 30, borderRadius: 20, background: getRandomHexColor() }}
    >
      <h2>타이머 페이지</h2>
      <p>카운트: {count}</p>
      {count < 1 && (
        <div>
          <p>타이머를 종료합니다😎</p>
          <button>카운트 시작</button>
        </div>
      )}
    </div>
  );
};

export default ChildTimerPage;
