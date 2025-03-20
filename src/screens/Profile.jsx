import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then(setUser);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* 標題 */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">用戶資料</h2>

      {/* 用戶資料卡片 */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-[400px] text-gray-900 border border-gray-200">
        {user ? (
          <pre className="bg-gray-50 p-4 rounded-md text-sm text-gray-700 whitespace-pre-wrap break-words">
            {JSON.stringify(user, null, 2)}
          </pre>
        ) : (
          <p className="text-gray-500 text-center animate-pulse">載入中...</p>
        )}
      </div>

      {/* 返回首頁按鈕 */}
      <button
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        onClick={() => navigate("/", { replace: true })}
      >
        返回首頁
      </button>
    </div>
  );
};

export default Profile;
