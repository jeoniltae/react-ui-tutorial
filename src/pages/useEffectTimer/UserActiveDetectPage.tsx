import React, { useEffect, useRef, useState } from "react";
import { getRandomHexColor } from "../../App";

const UserActiveDetectPage = ({ parentCount = 3 }: { parentCount: number }) => {
  const [isActeivUser, setIsActeivUser] = useState(false);
  const [count, setCount] = useState(parentCount);
  const timerRef = useRef<null | number>(null);
  const countDownTimerRef = useRef<null | number>(null);

  console.log("🥇자식 랜더링 isActeivUser: ", isActeivUser);

  // 사용자가 3초동안 가만히 있을때
  const startTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (countDownTimerRef.current) {
      clearInterval(countDownTimerRef.current);
    }

    // 종료하는 타이머
    timerRef.current = setTimeout(() => {
      console.log(`⌚ ${parentCount}초가 지남`, "자리비움 상태");
      setIsActeivUser((prev) => {
        if (prev === false) {
          return prev;
        }

        return false;
      });
    }, 1000 * parentCount);

    // 종료 남은시간을 알려주는 타이머
    countDownTimerRef.current = setInterval(() => {
      console.log("⌚ 자리비움까지 남은시간: ", count);

      setCount((prev) => {
        if (prev <= 1) {
          if (countDownTimerRef.current) {
            clearInterval(countDownTimerRef.current);
          }
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    // count 재설정
    setCount(parentCount);
  };

  const handleUserInteraction = () => {
    console.log("🏃‍♀️ 사용자가 활동중입니다.");

    setIsActeivUser((prev) => {
      if (prev === true) {
        return prev;
      }

      return true;
    });

    // 2개의 타이머가 실행된다.
    startTimer();
  };

  // 초기화
  useEffect(() => {
    setCount(parentCount);
    startTimer();
  }, [parentCount]);

  useEffect(() => {
    console.log("➡ 자식 마운트 isActeivUser: ", isActeivUser);

    window.document.addEventListener("mousemove", handleUserInteraction);

    return () => {
      console.log("➡❌ 자식 언마운트 isActeivUser: ", isActeivUser);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (countDownTimerRef.current) {
        clearInterval(countDownTimerRef.current);
      }
      window.document.removeEventListener("mousemove", handleUserInteraction);
    };
  }, [parentCount]);

  return (
    <div
      style={{ padding: 30, borderRadius: 20, background: getRandomHexColor() }}
    >
      <h2>사용자 활동 체크 페이지</h2>
      {isActeivUser && (
        <div>
          <p>👩 활동중</p>
          <p>⏳ 자리비움까지 남은시간 {count}초</p>
        </div>
      )}
      {!isActeivUser && <div>🤸‍♂️ 자리비움</div>}
    </div>
  );
};

export default UserActiveDetectPage;
