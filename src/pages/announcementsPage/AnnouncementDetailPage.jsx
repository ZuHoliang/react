import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AnnouncementDetailPage.css";

const API_BASE = "http://localhost:8088/api/announcements";
<<<<<<< HEAD
// 指定公告頁面
=======

>>>>>>> 1c1a4b8beb1bfdfd76f9905e98cee45ad8a9f955
const AnnouncementDetailPage = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch(`${API_BASE}/${id}`);
        if (!res.ok) throw new Error("無法取得公告資料");
        const data = await res.json();
        setAnnouncement(data);
      } catch (err) {
        console.error("取得公告失敗：", err);
        alert("載入公告資料時發生錯誤");
      }
    };

    if (id) {
      fetchAnnouncement();
    }
  }, [id]);

  if (!announcement) return <p>載入中...</p>;

  return (
    <div className="announcement-detail">
      <h1>{announcement.title}</h1>
      <p>
        <strong>發布者:</strong>
        {announcement.authorName}
      </p>
      <p>
        <strong>發布時間:</strong>
      </p>
      <div className="content">{announcement.content}</div>
    </div>
  );
};

export default AnnouncementDetailPage;
