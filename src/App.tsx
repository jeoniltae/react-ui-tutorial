import { useState } from "react";
import Counter from "./components/Counter";

export function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
}

function App() {
  // const 친구들: string[] = ["영희", "철수", "스티븐"];
  // const [firsts, second, third] = 친구들;
  // console.log(firsts, second, third);

  const [count, setCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [show, setShow] = useState(false);

  return (
    <>
      <div style={{ background: getRandomHexColor() }}>
        <h1>count: {count}</h1>
        <button onClick={() => setCount(count + 1)}>카운트 업</button>
        <button onClick={() => setCount(count - 1)}>카운트 다운</button>
      </div>

      <button onClick={() => setShow(!show)}>토클버튼</button>
      {show && (
        <Counter
          title="01"
          initValue={childCount}
          onChanged={(v) => setChildCount(v)}
        />
      )}
    </>
  );
}

export default App;
