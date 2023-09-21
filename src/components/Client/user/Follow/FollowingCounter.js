import React from 'react';

function FollowingCounter({ count }) {
  return (
    <div className="following-counter">
      <span>{count}</span>
      {/* <p>Following</p> */}
    </div>
  );
}

export default FollowingCounter;
