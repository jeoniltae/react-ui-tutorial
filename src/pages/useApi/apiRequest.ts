import type { todo } from "./useApi";

export const fetchTodos = async (signal: AbortSignal): Promise<todo[]> => {
  const res = await fetch("https://dummyjson.com/todos", { signal });
  const statusCode = res.status;

  if (statusCode === 400) {
    const errBody = await res.json();

    const errMsg = errBody.message ?? "";
    throw new Error(errMsg);
  }

  if (statusCode === 404) {
    throw new Error("존재하지 않는 URL");
  }

  const json = await res.json();

  const todosData = json.todos ?? [];

  return todosData;
};
