import React from 'react'
import { useDispatch } from 'react-redux';
import './CreatorHeader.css'
import Avatar from './Avatar/Avatar';
import Points from './Points/Points';
import Follow from './Follow/Follow';
import FavoritedBy from './FavoritedBy/FavoritedBy';
import { logoutUser } from '../../../redux/authentication/AuthenticationSlice';

function CreatorHeader({ creator }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    window.location.reload();
  };

    return (
      <div className="creator">
        <Avatar src={creator.avatar} alt={`${creator.username}'s Avatar`} />
        <Follow />
        <FavoritedBy />
        <Points points={creator.points} />
        <button type="button" onClick={handleLogout} className="signout-btn">
            {/* <FaUserCircle className="btn-logo" /> */}
            Log Out
          </button>
      </div>
    );
}

export default CreatorHeader