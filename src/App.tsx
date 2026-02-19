import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import RouterHomePage from "./pages/RouterHomePage";
import RouterShopPage from "./pages/RouterShopPage";
import RouterSportsPage from "./pages/RouterSportsPage";
import RouterBlogPage from "./pages/RouterBlogPage";
import NaviMenu from "./pages/NaviMenu";
import BlogLayout from "./layousts/routerExample/BlogLayout";
import RouterBlogChild01Page from "./pages/RouterBlogChild02Page";
import RouterBlogChild02Page from "./pages/RouterBlogChild01Page";
import RouterBlogChild03Page from "./pages/RouterBlogChild03Page";

function App() {
  return (
    <div style={{ background: "lightblue" }}>
      <BrowserRouter>
        <NaviMenu />
        <Routes>
          <Route path="/" element={<RouterHomePage />} />
          <Route path="/shop" element={<RouterShopPage />} />
          <Route path="/sports" element={<RouterSportsPage />} />

          <Route path="/blog" element={<BlogLayout />}>
            <Route index element={<RouterBlogPage />} />
            <Route path=":blogId" element={<RouterBlogPage />} />
            <Route
              path="test"
              element={<RouterBlogPage title="테스트 타이틀" />}
            />
            <Route path="1" element={<RouterBlogChild01Page />} />
            <Route path="2" element={<RouterBlogChild02Page />} />
            <Route path="3" element={<RouterBlogChild03Page />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
