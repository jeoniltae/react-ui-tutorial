import React, { useEffect } from "react";

const ChildApiAbort = () => {
  useEffect(() => {
    console.log("자식 마운트");

    // 네트워크 취소를 위해 AbortController를 생성
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch("https://dummyjson.com/products?delay=2000", { signal: signal })
      .then((res) => {
        console.log("res: ", res);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("어볼트 에러");
        } else {
          console.error("err: ", err);
        }
      })
      .finally(() => {
        console.log("finally");
      });

    return () => {
      // abortController.abort("자식 언마운트로 인해 네트워크 취소");
      abortController.abort();
      console.log("자식 언마운트");
    };
  }, []);

  console.log("자식 컴포넌트 랜더링");

  return (
    <div>
      <h1>ChildApiAbort</h1>
    </div>
  );
};

export default ChildApiAbort;
