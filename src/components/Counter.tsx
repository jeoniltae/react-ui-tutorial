import { useState } from "react";
import { getRandomHexColor } from "../App";

type CounterProps = {
  title: string;
  initValue: number;
  onChanged: (newValue: number) => void;
};

const Counter = ({ title, initValue = 0, onChanged }: CounterProps) => {
  // const [count, setCount] = useState(initValue);

  return (
    <div style={{ background: getRandomHexColor() }}>
      <h1>Counter: {title}</h1>
      <h2>count: {initValue}</h2>
      <button onClick={() => onChanged(initValue + 1)}>카운트 업</button>
    </div>
  );
};

export default Counter;
