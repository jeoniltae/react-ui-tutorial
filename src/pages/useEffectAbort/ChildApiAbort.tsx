import React, { useEffect, useState } from "react";

type product = {
  id: number;
  title: string;
};

// 에러 타입을 리터럴로 정의하여 타입 위치와 값 위치로 사용
// "타입은 값으로 사용 못한다"는 원칙은 맞습니다. 예를 들어 type Foo = string 같은 타입 별칭을 console.log(Foo)처럼 값으로 쓸 수는 없습니다. 하지만 문자열 리터럴('success')은 원래부터 JavaScript의 값이고, TypeScript가 타입 시스템에서도 이를 리터럴 타입으로 활용하는 것일 뿐입니다. 값이 먼저이고, 타입은 그 위에 얹어진 개념이라고 보시면 됩니다.
type ApiStatus = "idle" | "loading" | "success" | "failure";

const ChildApiAbort = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");

  useEffect(() => {
    console.log("자식 마운트");

    // 로딩중
    setApiStatus("loading");

    // 네트워크 취소를 위해 AbortController를 생성
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch("https://dummyjson.com/products?delay=7000", { signal: signal })
      .then((res) => {
        console.log("res: ", res);
        const statusCode = res.status;

        if (statusCode === 400) {
          return res.json().then((errBody) => {
            const errMsg = errBody.message ?? "";
            throw new Error(errMsg);
          });
        }

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
        setApiStatus("success");
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("어볼트 에러");
        } else {
          console.error("err: ", err);
          setErrMessage(err.message);
          setApiStatus("failure");
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
      {apiStatus === "loading" && <p>로딩중..</p>}
      {apiStatus === "failure" && errMessage && <p>{errMessage}</p>}
      {apiStatus === "success" && (
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
    </div>
  );
};

export default ChildApiAbort;
