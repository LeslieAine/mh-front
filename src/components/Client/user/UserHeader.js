import React from 'react'
import './UserHeader.css'
import Avatar from './Avatar/Avatar';
// import Username from './Username/Username';
import Points from './Points/Points';
import Follow from './Follow/Follow';

function UserHeader({ user }) {
    return (
      <div className="user">
        <Avatar src={user.avatar} alt={`${user.username}'s Avatar`} />
        <Follow />
        <Points points={user.points} />
      </div>
    );
}

export default UserHeader