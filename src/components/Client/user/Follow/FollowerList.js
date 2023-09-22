import React from 'react';

function FollowerList({ followers }) {
  return (
    <div className="follower-list">
      {/* <h3>Followers</h3> */}
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>
            <img src={follower.avatar} alt={`${follower.username}'s Avatar`} />
            <span>{follower.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FollowerList;
