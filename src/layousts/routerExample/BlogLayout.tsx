import { useState } from "react";
import { Outlet } from "react-router";

const BlogLayout = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div style={{ padding: "30px", background: "blue" }}>
      <h1>BlogLayout - TOP</h1>
      <h2>BlogLayout - COUNT: {count}</h2>
      <button onClick={() => setCount(count + 1)}>카운터 버튼</button>
      <Outlet
        context={{
          count,
          setCount,
        }}
      />
      <h1>BlogLayout - BOTTOM</h1>
    </div>
  );
};

export default BlogLayout;
