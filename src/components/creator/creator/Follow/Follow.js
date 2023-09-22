import React, { useState } from 'react';
import './Follow.css'
import FollowerList from './FollowerList';
import FollowingList from './FollowingList';
import FollowersCounter from './FollowersCounter';
import FollowingCounter from './FollowingCounter';

function Follow() {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const followers = [
    // Array of follower objects
    { id: 1, username: 'follower1', avatar: 'follower1-avatar.jpg' },
    { id: 2, username: 'follower2', avatar: 'follower2-avatar.jpg' },
    // ...
  ];

  const following = [
    // Array of following objects
    { id: 1, username: 'following1', avatar: 'following1-avatar.jpg' },
    { id: 2, username: 'following2', avatar: 'following2-avatar.jpg' },
    // ...
  ];

  const followersCount = followers.length;
  const followingCount = following.length;

  const toggleFollowers = () => {
    setShowFollowers(!showFollowers);
  };

  const toggleFollowing = () => {
    setShowFollowing(!showFollowing);
  };

  return (
    <div className="follow">
      <div className='followChild'>
        <FollowersCounter count={followersCount} />
        <div onClick={toggleFollowers} style={{ cursor: 'pointer'}}>
          Followers
        </div>
        {showFollowers && <FollowerList followers={followers} />}
      </div>
      
      <div className='followChild'>
        <FollowingCounter count={followingCount} />
        <div onClick={toggleFollowing} style={{ cursor: 'pointer'}}>
          Following
        </div>
        {showFollowing && <FollowingList following={following} />}
      </div>

    </div>
  );
}

export default Follow;
