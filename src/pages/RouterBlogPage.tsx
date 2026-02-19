import { useParams } from "react-router";

type RouterBlogPageProps = {
  title?: string;
};

const RouterBlogPage = ({ title }: RouterBlogPageProps) => {
  // path에 특정 데이터 넣을때 useParams훅 사용
  const parms = useParams();
  const { blogId } = useParams();

  return (
    <div style={{ background: "yellow", color: "#000" }}>
      <h1>RouterBlogPage</h1>
      <h2>title: {title}</h2>
      <p>parms blogId: {parms.blogId}</p>
      <p>parms blogId: {blogId}</p>
    </div>
  );
};

export default RouterBlogPage;
