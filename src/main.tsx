import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import App_라우터연습back from "./App_라우터연습back.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App_라우터연습back /> */}
    <App />
  </StrictMode>
);
