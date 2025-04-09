import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUserInfo } from "../auth";

const AnnouncementPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [target, setTarget] = useState("all");
  const [targetUserId, setTargetUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getUserInfo().then((userData) => {
      if (!userData) {
        navigate("/login");
      } else {
        setUser({
          email: userData.email, // 🔹 `authorId`
          username: userData.username, // 🔹 `authorName`
        });

        // 🔹 如果 URL 中有 id，則進入「編輯模式」
        if (id) {
          setIsEditing(true);
          axios.get(`${import.meta.env.VITE_API_URL}/announcements/${id}`)
            .then((response) => {
              const announcement = response.data;
              if (announcement.authorId !== userData.email) {
                alert("你沒有權限編輯這則公告！");
                navigate("/");
              } else {
                setTitle(announcement.title);
                setContent(announcement.content);
              }
            })
            .catch(error => console.error("無法獲取公告", error));
        }
      }
    });
  }, [id, navigate]);

  if (!user) return <p>載入中...</p>; // 🔹 確保 user 存在，避免 `NULL` 問題

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("請輸入標題和內容！");
      return;
    }

    if (!user.email || !user.username) {
      alert("無法獲取使用者資訊，請重新登入！");
      console.error("❌ 使用者資訊錯誤:", user);
      return;
    }

    const payload = {
      title,
      content,
      target,
      targetUserId: target === "specific" ? targetUserId : null,
      authorId: user.email,
      authorName: user.username,
    };

    try {
      const queryPromise = () => {
        return new Promise((resolve, reject) => {
          if (isEditing) {
            axios.put(`${import.meta.env.VITE_API_URL}/announcements/${id}`, payload)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
          } else {
            axios.post(`${import.meta.env.VITE_API_URL}/announcements`, {
              ...payload,
              target: "all",
            })
              .then((response) => resolve(response))
              .catch((error) => reject(error));
          }
        });
      };

      await queryPromise(); // 🔹 正確使用 `await`
      navigate("/");

    } catch (error) {
      console.error("公告處理失敗", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{isEditing ? "編輯公告" : "發布公告"}</h2>
      <input type="text" placeholder="標題" value={title} onChange={e => setTitle(e.target.value)} />
      
      <ReactQuill value={content} onChange={setContent} />

      <div>
        <label>公告對象：</label>
        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          <option value="all">所有人</option>
          <option value="specific">特定使用者</option>
        </select>

        {target === "specific" && (
          <div>
            <label>指定使用者 Email：</label>
            <input
              type="email"
              placeholder="輸入接收者的 Email"
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
            />
          </div>
        )}
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "處理中..." : isEditing ? "更新公告" : "發布公告"}
      </button>
      <button onClick={() => navigate("/")}>回首頁</button>

    </div>
  );
};

export default AnnouncementPage;
