// import React from 'react';
// // import PostCard from './PostCard';
// import CreatorPostCard from './CreatorPostCard';

// function CreatorPostList({ posts }) {
//   return (
//     <div className="post-list">
//       {posts.map((post) => (
//         <CreatorPostCard
//           key={post.id}
//           post = {post}
//         //   user={post.user}
//         //   content={post.content}
//         //   likes={post.likes}
//         //   comments={post.comments}
//         />
//       ))}
//     </div>
//   );
// }

// export default CreatorPostList;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../../redux/posts/postSlice'; // Import the fetchPosts action

import CreatorPostCard from './CreatorPostCard';

function CreatorPostList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts); // Assuming your Redux state structure

  useEffect(() => {
    // Dispatch the fetchPosts action when the component mounts
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <CreatorPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default CreatorPostList;

