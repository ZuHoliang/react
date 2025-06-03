import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import NavButton from '../../components/NavButton';
import LoginForm from '../../components/LoginForm'
import './Home.css'


const Home = () => {
  const { user } = useContext(AuthContext);

  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';

  return (
    
    <div className="page-container">
      <h1 className="page-title">簽到系統首頁</h1>
      <div className="content-row">
      {/* 左側公告區 */}
      <div className="page-left-panel">
        <h2 className="page-title">📢 公告</h2>
        <p>這裡顯示公告摘要或公告清單（未來從後端撈）</p>
      </div>

       {/* 右側使用者登入 */}
      <div className="right-panel">
        {!user?(
          <>
          <h2 className="page-title">員工登入</h2>
          <LoginForm />
          </>
              ) : (
                <>
              <h2 className="page-title">歡迎{user.name}!</h2>
              <NavButton to="/profile" label="個人資料" />
               {isUser || isAdmin && (
              <>
                <NavButton to="/schedulePage/Schedule" label="班表" />
                <NavButton to="/overtime" label="加班申請" />
                <NavButton to="/supplement" label="補簽到" />
                <NavButton to="/leavePage/Leave" label="請假申請" />
                <NavButton to="/attendance" label="出勤率查詢" />
                <NavButton to="/account/edit" label="修改個人帳號" />
              </>
            )}
            {isAdmin && (
              <>
                <NavButton to="/announcements/manage" label="編輯公告" />
                <NavButton to="/account/create" label="修改帳號" />
                <NavButton to="/attendance/query" label="考勤查詢" />
              </>
            )}
              </>
        )

        }
        </div>
      </div>
    </div>
  );
};

export default Home;