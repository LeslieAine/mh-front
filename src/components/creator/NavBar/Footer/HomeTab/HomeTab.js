import React from 'react';

function HomeTab({ isActive, onClick }) {
  return (
    <div className={`tab ${isActive ? 'active' : ''}`} onClick={() => onClick('home')}>
      <i className="fas fa-home"></i>
    </div>
  );
}

export default HomeTab;
