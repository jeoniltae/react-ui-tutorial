import { useOutletContext } from "react-router";
import type { BlogOutletContext } from "./RouterBlogChild01Page";

const RouterBlogChild02Page = () => {
  const { count, setCount } = useOutletContext<BlogOutletContext>();

  return (
    <div style={{ background: "#389184", color: "#fff" }}>
      <h1>RouterBlogChild02Page</h1>
      <p>공유된 데이터: {count}</p>
      <button onClick={() => setCount(count + 1)}>count up!</button>
    </div>
  );
};

export default RouterBlogChild02Page;
