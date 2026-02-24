import { useRef, useState } from "react";

export default function Stopwatch() {
  // 랜더링 + 데이터 유지
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);

  // 랜더링X, 데이터 유지
  function handleStart() {
    // 카운팅을 시작합니다.
    setStartTime(Date.now());
    setNow(Date.now());

    intervalRef.current = setInterval(() => {
      // 10ms 마다 현재 시간을 업데이트 합니다.
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
}
