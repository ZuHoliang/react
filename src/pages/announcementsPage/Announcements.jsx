import React, { useState, useEffect } from "react";
import AnnouncementSearchForm from "../../forms/AnnouncementSearchForm";
import AnnouncementCard from "../../contexts/AnnouncementCard";
import HomeButton from "../../components/HomeButton";
import "./Announcements.css";

const API_BASE = "http://localhost:8088/api";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnnouncements = async (query = "") => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/announcements${query}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      console.error("查詢公告失敗", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSearch = (keyword, startDate, endDate) => {
    const params = new URLSearchParams({
      keyword,
      startDate,
      endDate,
    });
    fetchAnnouncements(`/search?${params.toString()}`);
    // const query = `?keyword=
    //             ${encodeURIComponent(keyword)}&
    //             startDate=${startDate}
    //             &endDate=${endDate}`;
    // fetchAnnouncements(`/search${query}`);
  };

  return (
    <div className="announcement-page">
      <h2>公告頁面</h2>
      <AnnouncementSearchForm onSearch={handleSearch} />
      {loading ? (
        <p>載入中...</p>
      ) : (
        announcements.map((a) => (
          <AnnouncementCard key={a.announcementId} announcement={a} />
        ))
      )}
      <HomeButton />
    </div>
  );
};

export default Announcements;
