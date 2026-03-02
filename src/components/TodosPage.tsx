import React, { useRef, useState } from "react";
import { flushSync } from "react-dom";

const TodosPage = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const countRef = useRef(0);
  const listRef = useRef<HTMLUListElement>(null);
  const searchTodoRef = useRef("");

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="찾을 할 일 입력"
          onChange={(e) => {
            searchTodoRef.current = e.target.value;
          }}
        />
        <button
          onClick={() => {
            const foundItemIndex = todos.findIndex((v) => {
              return v === searchTodoRef.current;
            });

            console.log(foundItemIndex);

            const foundNode = listRef.current
              ?.querySelectorAll("li")
              [foundItemIndex].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
          }}
        >
          아이템 찾기
        </button>
      </div>

      <button
        onClick={() => {
          countRef.current += 1;
          const newTodo = `할일: ${countRef.current}`;
          flushSync(() => {
            setTodos(() => {
              return [...todos, newTodo];
            });
          });

          listRef.current?.lastElementChild?.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        아이템 추가
      </button>
      <ul
        ref={listRef}
        style={{
          width: "200px",
          height: "200px",
          background: "green",
          overflow: "auto",
        }}
      >
        {todos.map((v, index) => {
          return <li key={index}>{v}</li>;
        })}
      </ul>
      <button
        onClick={() => {
          listRef.current?.firstElementChild?.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        상단으로!
      </button>
    </div>
  );
};

export default TodosPage;
