import React from 'react';
import { Link } from 'react-router-dom';

function ContentsTab({ isActive, onClick }) {
  return (
    // <div className={`tab ${isActive ? 'active' : ''}`} onClick={() => onClick('contents')}>
    //   <i className="fas fa-list"></i>
    // </div>

    <div>
      <Link className="tab" to="/content">
        <i className="fas fa-list"></i>
      </Link>
    </div>
  );
}

export default ContentsTab;

