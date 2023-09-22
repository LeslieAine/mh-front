import React from 'react';

function DmsTab({ isActive, onClick }) {
  return (
    <div className={`tab ${isActive ? 'active' : ''}`} onClick={() => onClick('messages')}>
      <i className="fas fa-envelope"></i>
    </div>
  );
}

export default DmsTab;
