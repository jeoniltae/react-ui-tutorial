import { useEffect, useRef, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  // const [isCountThree, setIsCountThree] = useState(false);
  console.log("💕 랜더링: count: ", count);

  const isCountThree = count === 3;
  const isCountSix = count === 6;

  // 이렇게 작성할 경우 불필요한 useEffect훅이 실행됨. 8, 9번 라인으로(변수 선언) 최종 개선
  // useEffect(() => {
  //   console.log("➡ useEffect가 호출됨.");
  //   setIsCountThree(count === 3);
  // }, [count]);

  // 1. 랜더링 이후useEffect 구문이 계속 실행
  useEffect(() => {
    console.log("✅ useEffect 호출됨.");
  });

  // 2. 최초 한 번만 실행
  useEffect(() => {
    console.log("🙏 useEffect 최초 1번만 호출됨.");
  }, []);

  // 3. 특정 조건을 충족하면 실행
  useEffect(() => {
    console.log("🙋‍♂️ useEffect 특정 조건을 충족하면 호출됨.");
    if (!isCountThree) return;
    countThreeInputRef.current?.focus();
  }, [isCountThree]);

  useEffect(() => {
    console.log("🙋‍♂️🙋‍♂️ useEffect 특정 조건을 충족하면 호출됨.");
    if (!isCountSix) return;
    countSixInputRef.current?.focus();
  }, [isCountSix]);

  //⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚

  const countThreeInputRef = useRef<HTMLInputElement>(null);
  const countSixInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => {
              // setIsCountThree(count === 3); 이런식으로 작성하면 타이밍이 안맞음. 11번 라인으로 1차 개선
              return count + 1;
            });
          }}
        >
          count: {count}
        </button>

        <div>
          <input
            type="text"
            ref={countThreeInputRef}
            placeholder="count가 3일때 포커스가 됩니다."
          />
          <br />
          <input
            type="text"
            ref={countSixInputRef}
            placeholder="count가 6일때 포커스가 됩니다."
          />
        </div>
      </div>
    </>
  );
}

export default App;
