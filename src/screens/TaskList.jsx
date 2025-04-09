// TaskList.jsx
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../auth";

const API_BASE = "http://163.18.26.225:8088/flowable-rest";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo().then((user) => {
      fetch(`${API_BASE}/service/runtime/tasks?assignee=${user.username}`, {
        headers: {
          Authorization: "Basic " + btoa("admin:test"), // 或用 token
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTasks(data.data);
          setLoading(false);
        });
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">待辦任務</h2>
      {loading ? (
        <p>載入中...</p>
      ) : tasks.length === 0 ? (
        <p>目前沒有待辦任務</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <p>任務名稱：{task.name}</p>
              <p>指派者：{task.assignee}</p>
              <p>流程ID：{task.processInstanceId}</p>
              <a href={`/eip/task/${task.id}`}>前往表單</a>
              <hr className="my-2" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
