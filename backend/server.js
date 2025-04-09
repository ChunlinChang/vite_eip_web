require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
    console.error("後端錯誤:", err);
    res.status(500).json({ error: "伺服器錯誤", details: err.message });
  });

// 建立 MySQL 連線池
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// 測試 MySQL 連線
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL 連線失敗:", err);
  } else {
    console.log("✅ MySQL 連線成功");
    connection.release();
  }
});

// 引入公告 API
const announcementRoutes = require("./routes/announcements");
app.use("/api/announcements", announcementRoutes);

// 啟動伺服器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`伺服器運行於 http://localhost:${PORT}`));
