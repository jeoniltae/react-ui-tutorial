import React, { useEffect, useRef, useState } from "react";

const DebounceSearch = () => {
  const [userInput, setUserInput] = useState("");
  const timerIdRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <h1>DebounceSearch: {userInput}</h1>
      <input
        type="text"
        ref={inputRef}
        // value={userInput}
        onChange={(e) => {
          if (timerIdRef.current) {
            clearInterval(timerIdRef.current);
          }

          timerIdRef.current = setTimeout(() => {
            console.log("입력완료: ", e.target.value);
            setUserInput(e.target.value);
            inputRef.current?.blur();
          }, 1000);
        }}
      />

      <button onClick={() => inputRef.current?.focus()}>포커스</button>
      <button onClick={() => inputRef.current?.blur()}>포커스 해제</button>
    </div>
  );
};

export default DebounceSearch;
