import React from 'react';

function FavoritesTab({ isActive, onClick }) {
  return (
    <div className={`tab ${isActive ? 'active' : ''}`} onClick={() => onClick('favorites')}>
      <i className="fas fa-star"></i>
    </div>
  );
}

export default FavoritesTab;
