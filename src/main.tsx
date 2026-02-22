import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import App_라우터연습back from "./App_라우터연습back.tsx";
import App2 from "./App2.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App_라우터연습back /> */}

    {/* useState 연습 */}
    {/* <App /> */}

    {/* useState 심화 연습 */}
    <App2 />
  </StrictMode>
);
