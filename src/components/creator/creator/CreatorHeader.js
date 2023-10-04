import React from 'react'
import './CreatorHeader.css'
import Avatar from './Avatar/Avatar';
import Points from './Points/Points';
import Follow from './Follow/Follow';
import FavoritedBy from './FavoritedBy/FavoritedBy';

function CreatorHeader({ creator }) {

    return (
      <div className="creator">
        <Avatar src={creator.avatar} alt={`${creator.username}'s Avatar`} />
        <Follow />
        <FavoritedBy />
        <Points points={creator.points} />
      </div>
    );
}

export default CreatorHeader