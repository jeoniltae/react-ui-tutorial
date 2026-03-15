import React, { useEffect, useState } from "react";

type product = {
  id: number;
  title: string;
};

const ChildApiAbort = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errMessage, setErrMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log("자식 마운트");

    // 네트워크 취소를 위해 AbortController를 생성
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch("https://dummyjson.com/products?delay=1000", { signal: signal })
      .then((res) => {
        console.log("res: ", res);
        const statusCode = res.status;

        if (statusCode === 404) {
          throw new Error("존재하지 않는 URL");
        }

        return res.json();
      })
      .then((data) => {
        // 만약 data.products가 undefined이면 .map()을 호출할 수 없어서 에러가 납니다. ?? []로 빈 배열을 기본값으로 넣어주면 .map()이 에러 없이 빈 결과를 반환하게 됩니다.
        const productsData = data.products ?? [];
        const products = productsData.map((data: product) => {
          return {
            id: data.id,
            title: data.title,
          };
        });
        console.log("==============");
        console.log(products);
        console.log("==============");
        setProducts(products); // 👈 성공 응답 랜더링
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("어볼트 에러");
        } else {
          console.error("err: ", err);
          setErrMessage(err.message);
        }
      })
      .finally(() => {
        console.log("finally");
        setIsLoading(false);
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
      {isLoading ? (
        <p>로딩중..</p>
      ) : (
        <ul>
          {products.map((v) => {
            return (
              <li key={v.id}>
                {v.id}. {v.title}
              </li>
            );
          })}
        </ul>
      )}

      {errMessage && <p>{errMessage}</p>}
    </div>
  );
};

export default ChildApiAbort;
