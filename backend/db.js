const mysql = require("mysql2");
require("dotenv").config();

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

module.exports = db;
