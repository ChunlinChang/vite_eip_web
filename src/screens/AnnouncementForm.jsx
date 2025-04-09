import React, { useEffect, useRef, useState } from "react";
import { Formio } from "formiojs";
import formJson from "../formio/announcement.json";
import { getUserInfo } from "../auth"; // 你原本已有的登入者資料取得函數

const AnnouncementForm = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo().then((user) => {

      // 建立 Form.io 表單元件
      Formio.createForm(formRef.current, formJson).then((form) => {
        console.log("表單載入完成");

        // 預填寫使用者 Email
        form.submission = {
          data: {
            authorEmail: user.email,
            authorName: user.username || "", // 如果你有 authorName 欄位也可以帶
          },
        };

        // 處理送出事件
        form.on("submit", async (submission) => {
          const formData = submission.data;
          console.log("表單送出內容", formData);
        
          try {
            // 呼叫 Flowable 啟動流程
            const response = await fetch("http://163.18.26.225:8088/flowable-rest/service/runtime/process-instances", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa("admin:test") // 用 Flowable REST 的帳密
              },
              body: JSON.stringify({
                processDefinitionKey: "announcementApprovalProcess", // 請確保你流程的 key 是這個
                variables: [
                  { name: "title", value: formData.textfield || "" },
                  { name: "content", value: formData.textArea || "" },
                  { name: "departments", value: Object.keys(formData.columns2 || {}).filter(k => formData.columns2[k]) },
                  { name: "emails", value: formData.columnsEmail || "" },
                  { name: "time", value: formData.dateTime || "" },
                  { name: "authorEmail", value: formData.authorEmail || "" },
                  { name: "initiator", value: formData.authorEmail || "" },
                  { name: "approved", value: false }
                ]
              })
            });
        
            if (!response.ok) {
              const text = await response.text();
              throw new Error("Flowable 啟動流程失敗：" + text);
            }
        
            alert("公告已送出，簽核流程已啟動！");
            window.location.href = "/eip/";
        
          } catch (err) {
            console.error("❌ 發送流程失敗", err);
            alert("送出失敗：" + err.message);
          }
        });

        setLoading(false);
      });
    });
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">發布公告（Form.io JSON）</h2>
      {loading && <p>載入中...</p>}
      <div ref={formRef} />
    </div>
  );
};

export default AnnouncementForm;
