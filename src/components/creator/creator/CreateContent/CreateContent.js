import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContent } from '../../../../redux/content/contentSlice';
import './CreateContent.css';

const CreateContent = () => {
  const dispatch = useDispatch();
  const { creator } = useSelector((state) => state.authentication);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    isPaid: false,
    price: 1,
    url: '',
    creator_id: creator.status.data.id
  });

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    const formData = { content: form, creator_id: creator.status.data.id };

    dispatch(addContent(formData));
    setForm({
      title: '',
      description: '',
      isPaid: false,
      price: 1,
      url: '',
      creator_id: creator.status.data.id
    });
    closeForm();

    window.location.reload();

  };

  const handleInput = (ev) => setForm({
    ...form,
    [ev.target.name]: ev.target.value,
  });

  return (
    <div className="content-creation-container">
      <button className="open-button" onClick={openForm}>
        Create Content
      </button>

      {isFormOpen && (
        <div className="content-creation-modal">
          <div className="content-creation-form">
            <button className="close-button" onClick={closeForm}>
              Close
            </button>
            <h2>Create New Content</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input name="title" type="text" value={form.title} onChange={handleInput} />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea name="description" value={form.description} onChange={handleInput} />
              </div>
              <div className="form-group">
                <label>Is Paid:</label>
                <input name="isPaid" type="checkbox" checked={form.isPaid} onChange={handleInput} />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input name="price" type="number" value={form.price} onChange={handleInput} />
              </div>
              <div className="form-group">
                <label>Url:</label>
                <input name="url" type="text" value={form.url} onChange={handleInput} />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContent;
