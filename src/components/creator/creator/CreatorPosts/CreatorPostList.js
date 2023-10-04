import React from 'react';
// import PostCard from './PostCard';
import CreatorPostCard from './CreatorPostCard';

function CreatorPostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <CreatorPostCard
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

export default CreatorPostList;
