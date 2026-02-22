import React, { useState } from "react";

const App2 = () => {
  // 배열 상태관리
  // const myNumbers: number[] = [1, 2, 3, 4, 5];
  // const newArray = [...myNumbers, 98, 99, 100];
  // const [one, two, ...rest] = myNumbers;
  const friendsData = ["철수", "영희", "스티븐"];
  const [friends, setFriends] = useState(friendsData);
  const friendsEl = friends.map((v, index) => (
    <li key={index}>친구 이름: {v}</li>
  ));

  const listElTest = (
    <div>
      <ol>{friendsEl}</ol>
      <button
        onClick={() => {
          // friends.push("영구");
          const newArray = [...friends, "영구"];
          setFriends(newArray);
        }}
      >
        친구추가
      </button>
    </div>
  );

  // 객체 상태관리
  const userData = {
    name: "영희",
    age: 10,
    nickname: "빡코딩",
  };

  const [user, setUser] = useState(userData);

  const userInfoEl = Object.entries(user).map((v, index) => {
    const [objKey, objValue] = v;

    return (
      <h2 key={index}>
        {objKey}: {objValue}
      </h2>
    );
  });
  return (
    <div>
      <h1>State Advanced</h1>
      {/* {listElTest} */}
      <div>
        {userInfoEl}
        <button
          onClick={() => {
            const newAge = user.age + 1;
            const newObject = { ...user, age: newAge };
            setUser(newObject);
          }}
        >
          나이 한살 먹었다.
        </button>
        <button
          onClick={() => {
            const newObject = { ...user, nickname: "" };
            setUser(newObject);
          }}
        >
          닉네임 변경
        </button>
      </div>
    </div>
  );
};

export default App2;
