import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './ViewCreator1.css'
import Avatar from '../../creator/Avatar/Avatar';
import Username from '../../creator/Username/Username';
import Follow from '../../creator/Follow/Follow';
import FavoritedBy from '../../creator/FavoritedBy/FavoritedBy';

function ViewCreator() {
  return (
    <header>
      {/* User Profile Picture, Name, Followers, Following, Messaging, Favorited By */}
      {/* Replace the placeholders with actual user data */}
      <div className="profile-info">
        <Avatar />
        <Username />
        <Follow />
        <Link to="/messages">Message</Link>
        <FavoritedBy />
      </div>

      {/* Navigation links to different components */}
      <nav>
        <Link className='nav-link' to="/creator-profile/about-creator">About</Link>
        <Link className='nav-link' to="/creator-profile/content-list">Content</Link>
        <Link className='nav-link' to="/creator-profile/posts">Posts</Link>
      </nav>
      <Outlet />
    </header>
  );
}

export default ViewCreator;
