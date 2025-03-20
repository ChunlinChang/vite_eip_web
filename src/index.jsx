import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EipIndex from "./screens/EipIndex";
import Callback from "./screens/Callback";
import Login from "./screens/Loginerror";
import Profile from "./screens/Profile";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router basename="/eip"> {/* 🔹 確保 `basename="/eip"` */}
      <Routes>
        <Route path="/" element={<EipIndex />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  </StrictMode>
);
