import React from 'react'
import { useDispatch } from 'react-redux';
import './CreatorHeader.css'
import Avatar from './Avatar/Avatar';
import Points from './Points/Points';
import FavoritedBy from './FavoritedBy/FavoritedBy';
import { logoutUser } from '../../../redux/authentication/AuthenticationSlice';
import MyFollow from './Follow/MyFollow';

function CreatorHeader({ user }) {
  // console.log('user:', user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    window.location.reload();
  };

    return (
      <div className="creator">
        <Avatar src={user.avatar} alt={`${user.status.data.username}'s Avatar`} />
        <MyFollow />
        <FavoritedBy />
        <Points points={user.points} />
        <button type="button" onClick={handleLogout} className="signout-btn">
            {/* <FaUserCircle className="btn-logo" /> */}
            Log Out
          </button>
      </div>
    );
}

export default CreatorHeader