const express = require("express");
const router = express.Router();
const db = require("../db"); // 連接 MySQL

// 取得所有公告
router.get("/", (req, res) => {
    db.query("SELECT * FROM announcements ORDER BY created_at DESC", (err, results) => {
        if (err) return res.status(500).json({ message: "伺服器錯誤" });
        res.json(results);
    });
});

// 取得單一公告
router.get("/:id", (req, res) => {
    const announcementId = req.params.id;
    db.query("SELECT * FROM announcements WHERE id = ?", [announcementId], (err, result) => {
        if (err) return res.status(500).json({ message: "伺服器錯誤" });
        if (result.length === 0) return res.status(404).json({ message: "公告不存在" });
        res.json(result[0]);
    });
});

// 發布公告
router.post("/", async (req, res) => {
    const { title, content, target, targetUserId, authorId, authorName } = req.body;

    console.log("收到的請求資料:", req.body); 
    
    if (!title || !content || !authorId || !authorName || !target) {
        console.error("❌ 缺少必要欄位:", req.body);
        return res.status(400).json({ error: "缺少必要欄位" });
      }
  
    try {
      const queryPromise = new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO announcements (title, content, target, targetUserId, authorId, authorName) VALUES (?, ?, ?, ?, ?, ?)", 
          [title, content, target, targetUserId, authorId, authorName],
          (error, results) => {
            if (error) return reject(error);
            resolve(results);
          }
        );
      });
  
      await queryPromise;
  
      res.status(201).json({ message: "公告已發布" });
    } catch (error) {
      console.error("公告發布錯誤:", error);
      res.status(500).json({ error: "伺服器錯誤，請稍後再試" });
    }
});

// 更新公告
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content, authorId } = req.body;

    console.log("🔹 收到的更新請求:", req.body);

    if (!title || !content || !authorId) {
        return res.status(400).json({ error: "缺少必要欄位" });
    }

    try {
        const queryPromise = () => {
            return new Promise((resolve, reject) => {
                db.query("SELECT authorId FROM announcements WHERE id = ?", [id], (error, results) => {
                    if (error) return reject(error);
                    resolve(results[0]);
                });
            });
        };

        const announcement = await queryPromise();

        if (!announcement || announcement.authorId !== authorId) {
            return res.status(403).json({ error: "你只能修改自己發布的公告" });
        }

        const updateQuery = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "UPDATE announcements SET title = ?, content = ?, updated_at = NOW() WHERE id = ? AND authorId = ?",
                    [title, content, id, authorId],
                    (error, results) => {
                        if (error) return reject(error);
                        resolve(results);
                    }
                );
            });
        };

        await updateQuery();

        res.status(200).json({ message: "公告更新成功" });
    } catch (error) {
        console.error("公告更新錯誤:", error);
        res.status(500).json({ error: "伺服器錯誤，請稍後再試" });
    }
});

// 刪除公告 (只能刪除自己發布的公告)
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { authorId } = req.body;

    console.log("🔹 收到的刪除請求:", req.body);

    if (!authorId) {
        return res.status(400).json({ error: "缺少發佈者 ID" });
    }

    try {
        const queryPromise = new Promise((resolve, reject) => {
            db.query("SELECT authorId FROM announcements WHERE id = ?", [id], (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });

        const announcement = await queryPromise;

        if (!announcement || announcement.authorId !== authorId) {
            return res.status(403).json({ error: "你只能刪除自己發布的公告" });
        }

        const deleteQuery = new Promise((resolve, reject) => {
            db.query("DELETE FROM announcements WHERE id = ? AND authorId = ?", [id, authorId], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        await deleteQuery;

        res.status(200).json({ message: "公告刪除成功" });
    } catch (error) {
        console.error("公告刪除錯誤:", error);
        res.status(500).json({ error: "伺服器錯誤，請稍後再試" });
    }
});

module.exports = router;
