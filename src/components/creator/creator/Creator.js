import React from 'react';
import Avatar from './Avatar';
import Username from './Username';
import PointsEarned from './PointsEarned';

function creator({ creator }) {
  return (
    <div className="creator">
      <Avatar src={creator.avatar} alt={`${creator.username}'s Avatar`} />
      <Username username={creator.username} />
      <PointsEarned points={creator.points} />
    </div>
  );
}

export default creator;
