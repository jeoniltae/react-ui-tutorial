import React, { useEffect, useRef, useState } from "react";
import { getRandomHexColor } from "../../App";

const ChildTimerPage = ({ onFinish }: { onFinish: () => void }) => {
  const [count, setCount] = useState(5);
  const timerRef = useRef<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // const countRef = useRef(0);

  useEffect(() => {
    if (count === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      onFinish();
    }
  }, [count, isTimerRunning]);

  useEffect(() => {
    console.log("👏마운트 count: ", count);

    // 타이머가 동작중이면 아래 로직을 사용하지 않는다
    if (!isTimerRunning) {
      return;
    }

    // 타이머 생성
    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          console.log("❌❌타이머 지움: ", timerRef.current);
          // countRef.current = 0;
          timerRef.current = null;
          return 0;
        }

        const value = prev - 1;
        // countRef.current = value;
        return value;
      });
      console.log(`🕐인터벌 count: ${count}`);
    }, 1000);

    return () => {
      console.log("❌언마운트 count: ", count);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        console.log("❌❌타이머 지움: ", timerRef.current);
      }
    };
  }, [isTimerRunning]);

  console.log("🥇자식 랜더링 count: ", count);

  return (
    <div
      style={{ padding: 30, borderRadius: 20, background: getRandomHexColor() }}
    >
      <h2>타이머 페이지</h2>
      <p>카운트: {count}</p>
      {!isTimerRunning && (
        <div>
          <p>타이머를 종료합니다😎</p>
          <button
            onClick={() => {
              setCount(5);
              setIsTimerRunning(true);
            }}
          >
            카운트 시작
          </button>
        </div>
      )}
    </div>
  );
};

export default ChildTimerPage;
