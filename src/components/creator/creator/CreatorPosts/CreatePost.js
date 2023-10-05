// CreatePost.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../../../redux/posts/postSlice';

import './CreatePost.css'; // Import your CSS file

function CreatePost() {
  const [isOpen, setIsOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() !== '') {
      dispatch(addPost({ content: postContent }));
      setPostContent('');
      setIsOpen(false);
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
