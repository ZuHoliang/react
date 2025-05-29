import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import NavButton from '../../components/NavButton';
import './Home.css'


const Home = () => {
  const { user } = useContext(AuthContext);

  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';

  return (
    <div className="page-container">
      <h1 className="page-title">簽到系統首頁</h1>
      
      <div>
        <NavButton to="/Announcements" label="公告" />

        {!user ? (
          <NavButton to="/login" label="登入" />
        ) : (
          <NavButton to="/profile" label="個人資料" />
        )}

        {isUser && (
          <>
            <NavButton to="/schedulePage/Schedule" label="班表" />
            <NavButton to="/leavePage/Leave" label="請假申請" />
            {/* <NavButton to="/attendance" label="出勤率" /> */}
          </>
        )}

        {isAdmin && (
          <>
            <NavButton to="/schedulePage/Schedule" label="班表" />
            <NavButton to="/Announcements/manage" label="發布公告" />
            <NavButton to="/schedulePage/Schedule/edit" label="班表調整" />
            <NavButton to="/leavePage/Leave" label="請假申請" />
            {/* <NavButton to="/account/create" label="建立帳號" />
            <NavButton to="/attendance/query" label="考勤查詢" /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;