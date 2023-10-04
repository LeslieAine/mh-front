import React, { useState } from 'react';
import './CreateContent.css'

function CreateContent({ onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleIsPaidChange = (e) => {
    setIsPaid(e.target.checked);
  };

  const handleSubmit = () => {
    // Create a content object with the form data
    const content = {
      title,
      description,
      tags,
      isPaid,
    };

    // Pass the content object to the onSubmit callback
    onSubmit(content);

    // Close the form
    onClose();
  };

  return (
    <div className="content-creation-form">
        <button className="close-button" onClick={onClose}>
            Close
        </button>
      <h2>Create New Content</h2>
      <form>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange} />
        </div>
        <div className="form-group">
          <label>Tags:</label>
          <input type="text" value={tags} onChange={handleTagsChange} />
        </div>
        <div className="form-group">
          <label>Is Paid:</label>
          <input type="checkbox" checked={isPaid} onChange={handleIsPaidChange} />
        </div>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateContent;
