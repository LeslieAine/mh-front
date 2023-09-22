import React from 'react';
import DmCard from './DmCard'; // Import the DM component
import './DmList.css'; // Import the CSS file

function DMList({ messages }) {
  return (
    <div className="dm-list">
      {messages.map((dm, index) => (
        <DmCard key={index} user={dm.user} message={dm.message} />
      ))}
    </div>
  );
}

export default DMList;
