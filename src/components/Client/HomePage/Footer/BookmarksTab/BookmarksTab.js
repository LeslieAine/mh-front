import React from 'react';

function BookmarksTab({ isActive, onClick }) {
  return (
    <div className={`tab ${isActive ? 'active' : ''}`} onClick={() => onClick('bookmarks')}>
      <i className="fas fa-bookmark"></i>
    </div>
  );
}

export default BookmarksTab;
