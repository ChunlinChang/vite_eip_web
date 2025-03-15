import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { EipIndex } from "./screens/EipIndex";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <EipIndex />
  </StrictMode>,
);
