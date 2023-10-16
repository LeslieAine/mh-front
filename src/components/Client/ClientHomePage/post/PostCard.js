
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchPost } from '../../../../redux/posts/postSlice'; // Import the fetchPostById action

import ReactionsBar from './ReactionsBar/ReactionsBar';
import './PostCard.css';

function PostCard({ postId }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.posts.find((p) => p.id === postId)); // Assuming your Redux state structure

  useEffect(() => {
    // Dispatch the fetchPostById action when the component mounts
    dispatch(fetchPost(postId));
  }, [dispatch, postId]);

  if (!post || !post.user) {
    // Handle the case where the post is not available yet (e.g., still loading)
    return null;
  }

  return (
    <Link to={`/posts/${post.id}`} className="post-card">
      <div className="postcard">
        <div className="user-info">
          <img className="post-card-avatar" src={post.user.avatar} alt={`${post.user.username}'s Avatar`} />
          <span className="post-card-username">{post.user.username}</span>
        </div>
        <div className="content">
          <p>{post.content}</p>
        </div>
        <ReactionsBar />
      </div>
    </Link>
  );
}

export default PostCard;
