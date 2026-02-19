import { Link, useNavigate, NavLink } from "react-router";

const NaviMenu = () => {
  let navigate = useNavigate();

  return (
    <>
      <h1>React Router Tutorial</h1>
      {/* useNavigate 훅 사용 */}
      <div style={{ display: "flex", gap: "5px" }}>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          홈
        </button>
        <button
          onClick={() => {
            navigate("/sports");
          }}
        >
          스포츠
        </button>
        <button
          onClick={() => {
            navigate("/blog");
          }}
        >
          블로그
        </button>
        <button
          onClick={() => {
            navigate("/shop");
          }}
        >
          쇼핑
        </button>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          뒤로가기
        </button>
      </div>

      {/* Link 컴포넌트 사용 */}
      <div style={{ display: "flex", gap: "5px" }}>
        <Link to="/">홈</Link>
        <Link to="/sports">스포츠</Link>
        <Link to="/blog">블로그</Link>
        <Link to="/shop">쇼핑</Link>
      </div>

      {/* <NavLink /> 컴포넌트 사용 */}
      <div style={{ display: "flex", gap: "5px" }}>
        <NavLink to="/">홈</NavLink>
        <NavLink to="/sports">스포츠</NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) => (isActive ? "activeLink" : "normalLink")}
        >
          블로그
        </NavLink>
        <NavLink to="/blog/test">블로그테스트</NavLink>
        <NavLink to="/shop">
          {({ isActive }) => {
            if (isActive) {
              return <span>쇼핑 활성화됨</span>;
            }
            return <span>쇼핑</span>;
          }}
        </NavLink>
      </div>

      {/* Outlet context 테스트 */}
      <div style={{ display: "flex", gap: "5px" }}>
        <Link to="/blog/1">블로그1</Link>
        <Link to="/blog/2">블로그2</Link>
        <Link to="/blog/3">블로그3</Link>
      </div>
    </>
  );
};

export default NaviMenu;
