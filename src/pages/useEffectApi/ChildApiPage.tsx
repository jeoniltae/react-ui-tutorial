import { useEffect, useState } from "react";
import { getRandomHexColor } from "../../App";

// API 참고: https://dummyjson.com

const ChildApiPage = () => {
  const [dataTitle, setDataTitle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("✅자식 마운트 됨");

    setIsLoading(true); // 데이터 로딩중

    fetch("https://dummyjson.com/products?delay=3000")
      .then((res) => {
        console.log("✔응답 받아서 json으로 처리 - ", res);

        if (res.status !== 200) {
          throw new Error(`HTTP stats 코드에러: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);
        const keys = Object.keys(data);
        console.log("🗝keys: ", keys);
        setDataTitle(keys[0]);
      })
      .catch((err) => {
        console.error(`에러를 잡았다. ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      console.log("🗑언마운트 됨");
    };
  }, []);

  console.log("🙋‍♂️자식 렌더링");

  return (
    <div
      style={{ padding: 30, borderRadius: 8, background: getRandomHexColor() }}
    >
      <h1>ChildApiPage</h1>
      {isLoading ? (
        <p>데이터 로딩중 입니다💨💨💨</p>
      ) : (
        <div>
          <h2>가져온 데이터 제목</h2>
          <p>{dataTitle}</p>
        </div>
      )}
    </div>
  );
};

export default ChildApiPage;
