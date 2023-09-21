import React from 'react';

function FollowingList({ following }) {
  return (
    <div className="following-list">
      {/* <h3>Following</h3> */}
      <ul>
        {following.map((user) => (
          <li key={user.id}>
            <img src={user.avatar} alt={`${user.username}'s Avatar`} />
            <span>{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FollowingList;
