import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AnnouncementDetailPage.css";
import ErrorPage from "../errorPage/Error";
import useAuthFetch from "../../utils/useAuthFetch";
import HomeButton from "../../components/HomeButton";

const API_BASE = "http://localhost:8088/api/announcements";
// 指定公告頁面
const AnnouncementDetailPage = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [error, setError] = useState(null);
  const authFetch = useAuthFetch();

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await authFetch(`${API_BASE}/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("無法取得公告資料");
        const data = await res.json();
        setAnnouncement(data);
        setError(null);
      } catch (err) {
        setError("載入公告資料時發生錯誤");
      }
    };

    if (id) {
      fetchAnnouncement();
    }
  }, [id]);

  if (error) return <ErrorPage message={error} />;

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
        {new Date(announcement.createdTime).toLocaleString()}
      </p>
      <div className="content">{announcement.content}</div>
      <HomeButton />
    </div>
  );
};

export default AnnouncementDetailPage;
