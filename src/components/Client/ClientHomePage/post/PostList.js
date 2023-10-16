
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../../../../redux/posts/postSlice'; // Import the fetchPosts action

import PostCard from './PostCard';

function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts); // Assuming your Redux state structure

  useEffect(() => {
    // Dispatch the fetchPosts action when the component mounts
    dispatch(fetchPost());
  }, [dispatch]);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;

