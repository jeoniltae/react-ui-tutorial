import { getRandomHexColor } from "../../App";
import { useApi, type product, type todo } from "./useApi";

const ChildUseApi = () => {
  console.log("자식 컴포넌트 랜더링");

  const {
    data: products,
    isLoading,
    apiStatus,
    errMessage,
  } = useApi<product[]>(
    "https://dummyjson.com/products?delay=1000",
    (json: any) => {
      const productsData = json.products ?? [];
      const products = productsData.map((data: any) => {
        return {
          id: data.id,
          title: data.title,
        };
      });

      return products;
    }
  );
  const { data: todos } = useApi<todo[]>(
    "https://dummyjson.com/todos",
    (json: any) => {
      const todosData = json.todos ?? [];
      // const todos = todosData.map((data: any) => {
      //   return {
      //     id: data.id,
      //     title: data.title,
      //   };
      // });

      return todosData;
    }
  );

  return (
    <div
      style={{ padding: 30, borderRadius: 8, background: getRandomHexColor() }}
    >
      <h1>ChildAsyncAwaitApi</h1>
      <h2>TODOS</h2>
      <ul>
        {todos?.map((v) => {
          return (
            <li key={v.id}>
              <p>
                {v.id}. {v.todo} | {v.completed ? "✔" : "❌"}
              </p>
            </li>
          );
        })}
      </ul>
      {apiStatus === "loading" && <p>로딩중..</p>}
      {apiStatus === "failure" && errMessage && <p>{errMessage}</p>}
      {apiStatus === "success" && (
        <>
          <h2>PRODUCTS</h2>
          <ul>
            {products?.map((v) => {
              return (
                <li key={v.id}>
                  {v.id}. {v.title}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default ChildUseApi;
