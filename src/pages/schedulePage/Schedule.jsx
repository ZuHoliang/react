import React, {useContext} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import NavButton from "../../components/NavButton";
import Calendar from "../../components/Calendar";

const Schedule = () => {
  const {user} = useContext(AuthContext);
  const isAdmin = user?.role ==='admin';

  return (
    <div className="schedule-container">
  <h2 className="schedule-title"> 班表</h2>
  <p className="schedule-description">班表內容</p>
  
  {/* 識別權限 */}
  { isAdmin && (
    <div className="">
    <NavButton to = "/schedulePage/Schedule/edit" label="調整班表" />
    <Calendar />
    </div>
  )
  }

</div>
  );
};


export default Schedule