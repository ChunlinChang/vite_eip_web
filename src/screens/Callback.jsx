import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth";
import axios from "axios";
import Cookies from "js-cookie";

const IDP_BASE_URL = import.meta.env.VITE_IDP_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET; 

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const savedState = Cookies.get("oauth_state"); // **從 Cookie 讀取 oauth_state**

    console.log("code:", code);
    console.log("state:", state);
    console.log("oauth_state:", savedState);

    if (!code || state !== savedState) {
      console.error("Invalid OAuth response");
      return navigate("/login");
    }

    // **🔥 使用 `URLSearchParams` 確保表單格式正確**
    const requestData = new URLSearchParams();
    requestData.append("grant_type", "authorization_code"); 
    requestData.append("code", code);
    requestData.append("redirect_uri", REDIRECT_URI);
    requestData.append("client_id", CLIENT_ID);
    requestData.append("client_secret", CLIENT_SECRET); 

    axios
      .post(`${IDP_BASE_URL}/token`, requestData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true // **確保請求時帶上 Cookie**
      })
      .then((response) => {
        console.log("Token response:", response.data);

        const { access_token, refresh_token } = response.data;

        // **使用 Cookie 存 Token**
        Cookies.set("access_token", access_token, {
          expires: 0.02, // **30 分鐘過期**
          secure: true,
          sameSite: "None",
          path: "/"
        });

        Cookies.set("refresh_token", refresh_token, {
          expires: 7, // **7 天過期**
          secure: true,
          sameSite: "None",
          path: "/"
        });

        navigate("/"); // 成功後轉跳到首頁
      })
      .catch((error) => {
        console.error("Token exchange failed", error.response ? error.response.data : error);
        navigate("/loginerror");
      });
  }, [navigate]);

  return <p>正在處理登入...</p>;
};

export default Callback;
