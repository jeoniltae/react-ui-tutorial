import { useSearchParams } from "react-router";

const RouterShopPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  // query=123&category=hoho
  const query = searchParams.get("query");
  const category = searchParams.get("category");

  return (
    <div style={{ background: "orange", color: "#fff" }}>
      <h1>RouterShopPage</h1>
      <p>query: {query}</p>
      <p>category: {category}</p>
    </div>
  );
};

export default RouterShopPage;
