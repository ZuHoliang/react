import React, { useState, useEffect } from "react";
import SwapReplyDialog from "./SwapReplyDialog";
// import "./SwapRequestCard.css";

const SwapRequestCard = ({ request, isReceived, onReply, onCancel }) => {
  const [replyOpen, setReplyOpen] = useState(false);

  const handleApprove = (message) => {
    onReply(request.requestId, true, message);
    setReplyOpen(false);
  };

  return (
    <div className="swap-card">
      <div className="card-content">
        <div>
          <strong>{isReceived ? "申請人" : "被申請人"} :</strong>
          {isReceived ? request.requesterName : request.targetName}
        </div>
        <div>
          <strong>班別:</strong>
          {request.swapDate}
          {request.swapToShift === "MORNING" ? "早班" : "晚班"}
        </div>
        {request.swapMessage && (
          <div>
            <strong>留言:</strong>
            {request.swapMessage}
          </div>
        )}
      </div>
      {isReceived ? (
        <div className="card-actions">
          <button onClick={() => setReplyOpen(true)}>同意 / 拒絕 </button>
        </div>
      ) : (
        <div className="card-actions">
          <button onClick={() => onCancel(request.requestId)}>取消申請</button>
        </div>
      )}

      {replyOpen && (
        <SwapReplyDialog
          onApprove={handleApprove}
          onReject={handleReject}
          onClose={() => setReplyOpen}
        />
      )}
    </div>
  );
};

export default SwapRequestCard;
