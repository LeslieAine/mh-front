import React, { useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import './ViewCreator1.css'
import Avatar from '../../creator/Avatar/Avatar';
import Username from '../../creator/Username/Username';
import Follow from '../../creator/Follow/Follow';
import FavoritedBy from '../../creator/FavoritedBy/FavoritedBy';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../../../redux/user/userSlice';

function ViewCreator() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchUser(id));
    }, [dispatch, id]);

    // const { userId } = useParams();

    // const dispatch = useDispatch();
    // const user = useSelector((state) => state.user);

    // useEffect(() => {
    //     // Dispatch the fetchUser action when the component mounts
    //     dispatch(fetchUser(userId));
    // }, [dispatch, userId]);

  return (
    <header>
      {/* User Profile Picture, Name, Followers, Following, Messaging, Favorited By */}
      {/* Replace the placeholders with actual user data */}
      <div className="profile-info">
        <img className="post-card-avatar" src={user.id} alt={`${user.username}'s Avatar`} />
        <span className="post-card-username">{user.username}</span>
        <Follow />
        {/* <Link to={`/creator-profile/${id}/chatrooms/createchat`}>Message</Link> */}
        <Link to={`/creator-homepage/messages/createchat`}>Message</Link>
        <FavoritedBy />
      </div>

      {/* Navigation links to different components */}
      <nav>
        <Link className='nav-link' to={`/creator-profile/${id}/about-creator`}>About</Link>
        <Link className='nav-link' to={`/creator-profile/${id}/content-list`}>Content</Link>
        <Link className='nav-link' to={`/creator-profile/${id}/posts`}>Posts</Link>
      </nav>
      <Outlet />
    </header>
  );
}

export default ViewCreator;
