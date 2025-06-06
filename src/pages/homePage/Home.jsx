import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import NavButton from "../../components/NavButton";
import LoginForm from "../../components/LoginForm";
import "./Home.css";

const API_BASE = "http://localhost:8088/api";

const Home = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [announcementLoading, setAnnouncementLoading] = useState(false);

  //取得公告
  const fetchAnnouncements = async () => {
    try {
      setAnnouncementLoading(true);
      const response = await fetch(`${API_BASE}/announcements/latest`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data);
      } else {
        console.error("獲取公告失敗");
      }
    } catch (error) {
      console.error("獲取公告錯誤:", error);
    } finally {
      setAnnouncementLoading(false);
    }
  };

  useEffect(() => {
    console.log("載入首頁，獲取最新公告");
    fetchAnnouncements();
  }, []);

  // 判斷用戶權限
  const isAdmin = user?.role === 2; //role=2 是 ADMIN
  const isUser = user?.role === 1 || user?.role === 2; // role=1 是 USER，role=2 是 ADMIN

  if (loading) {
    return <div className="loading">載入中...</div>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">簽到系統首頁</h1>

      {/* 左側公告區，*/}
      <div className="content-row">
        <div className="page-left-panel">
          <h2 className="panel-title">公告</h2>
          {announcementLoading ? (
            <p>載入公告中...</p>
          ) : announcements.length > 0 ? (
            <div className="announcements-list">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="announcement-item">
                  <h3>{announcement.title}</h3>
                  <p>{announcement.content}</p>
                  <small>
                    發布時間:{" "}
                    {new Date(announcement.createTime).toLocaleDateString()}
                  </small>
                </div>
              ))}
            </div>
          ) : (
            <p>暫無公告</p>
          )}
        </div>
        {/* 右側使用者登入 */}
        <div className="right-panel">
          {!user ? (
            <>
              <h2 className="page-title">員工登入</h2>
              <LoginForm />
            </>
          ) : (
            <>
              <h2 className="page-title">歡迎 {user.username || user.name}!</h2>
              <NavButton to="/profile" label="個人資料" />

              {(isUser || isAdmin) && (
                <>
                  <NavButton to="Schedule" label="班表" />
                  <NavButton to="/overtime" label="加班申請" />
                  <NavButton to="/supplement" label="補簽到" />
                  <NavButton to="Leave" label="請假申請" />
                  <NavButton to="/attendance" label="出勤率查詢" />
                  <NavButton to="/account/edit" label="修改個人帳號" />
                </>
              )}

              {isAdmin && (
                <>
                  <NavButton to="Announcements" label="編輯公告" />
                  <NavButton to="/account/create" label="修改帳號" />
                  <NavButton to="/attendance/query" label="考勤查詢" />
                </>
              )}

              <button onClick={logout} className="logout-button">
                登出
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
