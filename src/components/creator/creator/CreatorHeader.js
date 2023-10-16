import React from 'react'
import { useDispatch } from 'react-redux';
import './CreatorHeader.css'
import Avatar from './Avatar/Avatar';
import Points from './Points/Points';
import Follow from './Follow/Follow';
import FavoritedBy from './FavoritedBy/FavoritedBy';
import { logoutCreator } from '../../../redux/authentication/AuthCreatorSlice';

function CreatorHeader({ creator }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutCreator());
    localStorage.removeItem('creator');
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