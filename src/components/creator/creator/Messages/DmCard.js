import React from 'react';
import './DmList.css'; // Import the CSS file

function DmCard({ user, message }) {
  return (
    <div className="dm">
      <div className="dm-avatar">
        <img src={user.avatar} alt={`Avatar of ${user.username}`} />
      </div>
      <div className="dm-content">
        <div className="dm-user">{user.username}</div>
        <div className="dm-message">{message}</div>
      </div>
    </div>
  );
}

export default DmCard;
