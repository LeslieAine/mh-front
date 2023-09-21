import React from 'react';
import PostCard from './PostCard';

function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post = {post}
        //   user={post.user}
        //   content={post.content}
        //   likes={post.likes}
        //   comments={post.comments}
        />
      ))}
    </div>
  );
}

export default PostList;
