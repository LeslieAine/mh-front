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
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../../../redux/posts/postsSlice'; // Import the fetchPosts action
import ReactionsBar from './ReactionsBar/ReactionsBar';

// import CreatorPostCard from './CreatorPostCard';

function CreatorPostList() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.posts); // from Redux state structure
//   console.log(data); 

  useEffect(() => {
    // Dispatch the fetchPosts action when the component mounts
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="post-list">
      {data.isLoading ? (
        <p>Loading...</p>
      ) : (
        data.posts && data.posts.map((post) => (
          <CreatorPostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
}

export default CreatorPostList;

const CreatorPostCard = ({ post }) => {
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
  

