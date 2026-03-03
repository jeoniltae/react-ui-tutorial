import React, { useEffect, useState } from "react";
import { getRandomHexColor } from "../App";

type UseEffectExChildPageProps = {
  parentCount: number;
};

const UseEffectExChildPage = ({ parentCount }: UseEffectExChildPageProps) => {
  const [myCount, setMyCount] = useState(0);

  useEffect(() => {
    console.log("✅ UseEffectExChildPage 마운트가 되었다. 보임", parentCount);

    const handleWindowWidthChange = () => {
      console.log("브라우저 창 리사이징: ", window.innerWidth);
    };

    window.addEventListener("resize", handleWindowWidthChange);

    // 클린업 함수
    return () => {
      console.log(
        "❌ UseEffectExChildPage 언마운트가 되었다. 사라짐",
        parentCount
      );
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  }, []);

  console.log("😁UseEffectExChildPage 랜더링", parentCount);

  return (
    <div
      style={{ color: getRandomHexColor(), background: getRandomHexColor() }}
    >
      <h1>UseEffectExChildPage</h1>
      <p>parentCount: {parentCount}</p>

      <h2>myCount: {myCount}</h2>
      <button onClick={() => setMyCount((prev) => prev + 1)}>
        자식 카운트 UP: {myCount}
      </button>
    </div>
  );
};

export default UseEffectExChildPage;
