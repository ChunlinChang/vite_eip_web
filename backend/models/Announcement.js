const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // 儲存富文本內容
  authorId: { type: String, required: true }, // 發布者 ID
  authorName: { type: String, required: true }, // 發布者名稱
  target: { type: String, required: true, enum: ["all", "specific"] }, // 公告對象
  targetUserId: { type: String }, // 若為個人公告則儲存對象 ID
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Announcement", announcementSchema);
