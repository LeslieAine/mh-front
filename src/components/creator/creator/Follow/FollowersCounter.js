import React from 'react';

function FollowersCounter({ count }) {
  return (
    <div className="followers-counter">
      <span>{count}</span>
      {/* <p>Followers</p> */}
    </div>
  );
}

export default FollowersCounter;
