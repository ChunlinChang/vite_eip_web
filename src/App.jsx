import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import EipIndex from "./screens/EipIndex";
import Callback from "./screens/Callback";
import Login from "./screens/Loginerror";
import Profile from "./screens/Profile";
import AnnouncementPage from "./screens/AnnouncementPage";
import AnnouncementForm from "./screens/AnnouncementForm";
import TaskList from "./screens/TaskList";
import { login, getUserInfo } from "./auth"; // 取得使用者資訊

const PrivateRoute = ({ element }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo().then((userData) => {
      setUser(userData);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>載入中...</p>;

  return user ? element : login();
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router basename="/eip"> {/* 🔹 確保 `basename="/eip"` */}
      <Routes>
        <Route path="/" element={<EipIndex />} /> {/* 🔹 移除 PrivateRoute */}
        {/* <Route path="/" element={<PrivateRoute element={<EipIndex />} />} /> */}
        <Route path="/callback" element={<Callback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/announcements" element={<PrivateRoute element={<AnnouncementPage />} />} />
        <Route path="/announcements/:id" element={<PrivateRoute element={<AnnouncementPage />} />} /> */}
        <Route path="/announcementform" element={<AnnouncementForm />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </Router>
  </StrictMode>
);
