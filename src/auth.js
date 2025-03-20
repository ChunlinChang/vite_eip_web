import Cookies from "js-cookie";

const IDP_BASE_URL = import.meta.env.VITE_IDP_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export const login = () => {
  const state = Math.random().toString(36).substring(7); // 產生隨機 state 防止 CSRF 攻擊
  Cookies.set("oauth_state", state, { secure: true, sameSite: "None" });

  const authUrl = `${IDP_BASE_URL}/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid&state=${state}`;

  window.location.href = authUrl; // 將使用者導向 IDP 登入頁面
};

export const getUserInfo = async () => {
  // **只從 Cookie 讀取 access_token**
  const accessToken = Cookies.get("access_token");
  if (!accessToken) return null; // 沒有 Token 就直接返回

  try {
    const response = await fetch(`${IDP_BASE_URL}/userinfo`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: "include", // **確保帶上 Cookie**
    });

    if (response.status === 200) {
      return response.json();
    } else {
      console.error("Failed to fetch user info");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user info", error);
    return null;
  }
};

export const logout = () => {
  // **清除 Cookie**
  Cookies.remove("access_token", { secure: true, sameSite: "None" });
  Cookies.remove("refresh_token", { secure: true, sameSite: "None" });

  window.location.href = "/eip/";
};
