// CreatePost.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../../../redux/posts/postSlice';

import './CreatePost.css'; // Import your CSS file

function CreatePost() {
  const [isOpen, setIsOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const { creator } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { content: postContent, creator_id: creator.status.data.id };
    if (postContent.trim() !== '') {
        // console.log(newpost)
      dispatch(addPost({ post }));
      setPostContent('');
      setIsOpen(false);
    window.location.reload();
    }
  };

  return (
    <div className="create-post">
      <button onClick={() => setIsOpen(!isOpen)}>Create Post</button>
      {isOpen && (
        <form onSubmit={handleSubmit}>
          <textarea
            rows="4"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
          <button type="submit">Post</button>
        </form>
      )}
    </div>
  );
}

export default CreatePost;
