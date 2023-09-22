import React from 'react';
import Avatar from './Avatar';
import Username from './Username';
import PointsEarned from './PointsEarned';

function User({ user }) {
  return (
    <div className="user">
      <Avatar src={user.avatar} alt={`${user.username}'s Avatar`} />
      <Username username={user.username} />
      <PointsEarned points={user.points} />
    </div>
  );
}

export default User;
