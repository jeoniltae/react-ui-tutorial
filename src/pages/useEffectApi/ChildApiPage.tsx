import { useEffect, useRef, useState } from "react";
import { getRandomHexColor } from "../../App";

// API 참고: https://dummyjson.com

const ChildApiPage = () => {
  const [dataTitle, setDataTitle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0); // useState - 랜더링 목적
  const [secondCount, setSecondCount] = useState(0); // useState - 랜더링 목적
  const countRef = useRef(0); // useRef - 값의 참조 목적

  const apiUrl = [
    "https://dummyjson.com/products?delay=5000",
    "https://dummyjson.com/recipes?delay=2000",
  ];

  const requsetId = useRef(0);

  // products 호출
  useEffect(() => {
    console.log("✅자식 마운트 됨");

    requsetId.current = requsetId.current + 1;
    const id = requsetId.current;

    if (count < 1) {
      console.log("API호출 막음: ", `count: ${count}`);
      return;
    }

    fetch("https://dummyjson.com/products?delay=5000")
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
        if (requsetId.current === id) {
          setDataTitle(keys[0]);
          console.log(
            "응답 데이터 반영🟢 - requsetId",
            requsetId.current,
            `/ id: ${id}`
          );
        } else {
          console.log(
            "응답 데이터 반영❌ - requsetId",
            requsetId.current,
            `/ id: ${id}`
          );
        }
      })
      .catch((err) => {
        console.error(`에러를 잡았다. ${err}`);
      });

    return () => {
      console.log("🗑언마운트 됨");
    };
  }, [count]);

  // recipes 호출
  useEffect(() => {
    console.log("✅자식 마운트 됨");

    requsetId.current = requsetId.current + 1;
    const id = requsetId.current;

    if (secondCount < 1) {
      console.log("API호출 막음: ", `secondCount: ${secondCount}`);
      return;
    }

    fetch("https://dummyjson.com/recipes?delay=2000")
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
        if (requsetId.current === id) {
          setDataTitle(keys[0]);
          console.log(
            "응답 데이터 반영🟢 - requsetId",
            requsetId.current,
            `/ id: ${id}`
          );
        } else {
          console.log(
            "응답 데이터 반영❌ - requsetId",
            requsetId.current,
            `/ id: ${id}`
          );
        }
      })
      .catch((err) => {
        console.error(`에러를 잡았다. ${err}`);
      });

    return () => {
      console.log("🗑언마운트 됨");
    };
  }, [secondCount]);

  console.log("🙋‍♂️자식 렌더링");

  return (
    <div
      style={{ padding: 30, borderRadius: 8, background: getRandomHexColor() }}
    >
      <h1>ChildApiPage</h1>
      <div>
        <h2>가져온 데이터 제목</h2>
        <p>{dataTitle}</p>
      </div>
      {/* {isLoading ? (
        <p>데이터 로딩중 입니다💨💨💨</p>
      ) : (
        <div>
          <h2>가져온 데이터 제목</h2>
          <p>{dataTitle}</p>
        </div>
      )} */}

      <button
        onClick={() =>
          setCount((prev) => {
            const result = prev + 1;
            // countRef.current = result;
            return result;
          })
        }
      >
        products 호출 카운트: {count}
      </button>

      <button
        onClick={() =>
          setSecondCount((prev) => {
            const result = prev + 1;
            // countRef.current = result;
            return result;
          })
        }
      >
        recipes 호출 카운트: {count}
      </button>
    </div>
  );
};

export default ChildApiPage;

/**
 * <isApiFetching 취소 플래그(cancel flag) 패턴 동작 원리를 단계별로 설명>
 * 동작 원리
 * 1. 클로저(Closure)를 활용한 플래그 변수
 * isApiFetching은 useEffect 콜백 내부에 선언된 지역 변수입니다. 이 변수는 클로저에 의해 아래 두 곳에서 공유됩니다:
 * .then() 콜백 (43번 라인) — 응답 데이터를 state에 반영할지 판단
 * 클린업 함수 (57~60번 라인) — 언마운트/리렌더 시 플래그를 false로 변경
 * 
 * 2. 전체 흐름
 * [마운트 / count 변경]
    │
    ▼
useEffect 실행
    │
    ├─ isApiFetching = true  ← 플래그 활성화
    │
    ├─ fetch() 호출 (비동기 API 요청 시작)
    │
    ▼
[언마운트 or count 재변경 발생 시]
    │
    ▼
클린업 함수 실행
    │
    └─ isApiFetching = false  ← 플래그 비활성화
    
    ...그 사이 fetch 응답이 도착하면...
    │
    ▼
.then() 에서 isApiFetching 확인
    ├─ true  → setDataTitle() 호출 (데이터 반영 🟢)
    └─ false → 무시 (데이터 반영 ❌)

  * 3. 왜 필요한가? — Race Condition 방지
      이 패턴이 없으면 다음과 같은 문제가 발생합니다:
      사용자가 버튼을 눌러 count가 0 → 1로 변경
      첫 번째 API 요청 (5초 딜레이) 이 아직 진행 중
      두 번째 API 요청 (2초 딜레이) 이 새로 시작됨
      두 번째 응답이 먼저 도착해서 setDataTitle("recipes") 적용
      이후 첫 번째 응답이 늦게 도착해서 setDataTitle("products")로 덮어씀
      결과적으로 사용자가 보는 데이터가 이전 요청의 결과로 덮어씌워지는 문제가 생깁니다.
      isApiFetching 플래그 덕분에, count가 변경되면 이전 effect의 클린업이 먼저 실행되어 isApiFetching = false가 되고, 늦게 도착한 이전 응답은 43번 라인의 if (isApiFetching) 체크에서 걸려 state 업데이트가 무시됩니다.

  * 4. 각 렌더마다 독립적인 플래그
  useEffect 내부의 let이기 때문에, 렌더가 발생할 때마다 새로운 isApiFetching 변수가 생성됩니다. 이전 렌더의 클린업 함수는 이전 렌더의 isApiFetching을 참조하고, 새 렌더의 effect는 새로운 isApiFetching을 참조합니다. 이것이 클로저의 핵심입니다.
 */

/**
   * 여러 액션에 따라 API 호출을 하면 이전에 호출한 API를 무시하고 최신 API결과만 반영하려고 하면 지역변수로는 한계가 있음.
   * 그래서 useRef로 컴포넌트 내에서 참조로 활용이 가능하다.
   * 
   * <requsetId(useRef)를 활용한 "요청 ID 비교" 패턴 설명>
   * 핵심 개념: "번호표" 시스템
    requsetId.current를 번호표 발급기라고 생각하면 됩니다.
    API를 호출할 때마다 번호표를 하나 뽑아서 기억해둠 (const id)
    응답이 돌아오면, 지금 번호표 발급기의 최신 번호와 내가 뽑은 번호가 같은지 비교
   * 
   * 구체적인 시나리오로 설명
    1단계: products 버튼 클릭

    requsetId.current: 0 → 1 (번호표 발급)
    const id = 1              (내 번호표: 1)
    → products API 호출 (5초 딜레이, 느림...)

    2단계: 기다리는 동안 recipes 버튼 클릭
    requsetId.current: 1 → 2 (번호표 발급)
    const id = 2              (내 번호표: 2)
    → recipes API 호출 (2초 딜레이, 빠름!)

    3단계: recipes 응답 도착 (2초 후)
    확인: requsetId.current(2) === id(2) ? ✅ YES!
    데이터 반영 🟢 setDataTitle("recipes")

    4단계: products 응답 도착 (5초 후)
    확인: requsetId.current(2) === id(1) ? ❌ NO!
    데이터 반영 안 함 ❌ (무시!)

    * 왜 이렇게 되는가?
    핵심은 이 두 줄에 있습니다.

    requsetId.current = requsetId.current + 1;
    const id = requsetId.current;

    requsetId는 useRef이므로 두 useEffect가 같은 값을 공유합니다
    const id는 일반 지역변수이므로 각 호출 시점의 값이 고정(스냅샷)됩니다
    그래서 나중에 응답이 도착했을 때:

    if (requsetId.current === id) {
    setDataTitle(keys[0]);

    requsetId.current → 지금 시점의 최신 번호 (계속 바뀜)
    id → 이 요청이 발생했을 때의 번호 (고정됨)
    "내가 가장 최근에 요청한 건가?" 를 확인하는 것과 같습니다. 최신 요청이 아니면 응답이 와도 무시합니다.

    * 이렇게 해서 느린 요청이 나중에 도착해도 화면을 덮어쓰지 않는 Race Condition 문제를 방지하는 것입니다.
   */
