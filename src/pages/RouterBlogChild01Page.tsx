import { useOutletContext } from "react-router";

export type BlogOutletContext = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const RouterBlogChild01Page = () => {
  const { count, setCount } = useOutletContext<BlogOutletContext>();

  return (
    <div style={{ background: "#389184", color: "#fff" }}>
      <h1>RouterBlogChild01Page</h1>
      <p>공유된 데이터: {count}</p>
      <button onClick={() => setCount(count + 1)}>count up!</button>
    </div>
  );
};

export default RouterBlogChild01Page;
