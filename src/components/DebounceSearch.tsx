import React, { useRef, useState } from "react";

const DebounceSearch = () => {
  const [userInput, setUserInput] = useState("");
  const timerIdRef = useRef<number | null>(null);

  return (
    <div>
      <h1>DebounceSearch: {userInput}</h1>
      <input
        type="text"
        // value={userInput}
        onChange={(e) => {
          if (timerIdRef.current) {
            clearInterval(timerIdRef.current);
          }

          timerIdRef.current = setTimeout(() => {
            console.log("입력완료: ", e.target.value);
            setUserInput(e.target.value);
          }, 1000);
        }}
      />
    </div>
  );
};

export default DebounceSearch;
