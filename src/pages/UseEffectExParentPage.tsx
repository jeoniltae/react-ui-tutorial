import React, { useEffect, useState } from "react";
import UseEffectExChildPage from "./UseEffectExChildPage";
import ChildTimerPage from "./useEffectTimer/ChildTimerPage";
import UserActiveDetectPage from "./useEffectTimer/UserActiveDetectPage";

const UseEffectExParentPage = () => {
  const [count, setCount] = useState(3);
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    console.log("✅ UseEffectExParentPage useEffect 호출됨.");
  }, []);

  console.log("😁UseEffectExParentPage 랜더링", count);

  return (
    <div>
      <h1>UseEffectExParentPage</h1>
      <div>
        {/* {showChild && <UseEffectExChildPage parentCount={count} />} */}
        {/* {showChild && <ChildTimerPage onFinish={() => setShowChild(false)} />} */}
        {showChild && <UserActiveDetectPage parentCount={count} />}

        <button onClick={() => setCount((prev) => prev + 1)}>
          부모 count Up: {count}
        </button>
        <br />
        <button onClick={() => setShowChild((prev) => !prev)}>
          자식 노출여부 토글 버튼: {showChild ? "자식이 보임" : "자식 안보임"}
        </button>
      </div>
    </div>
  );
};

export default UseEffectExParentPage;
