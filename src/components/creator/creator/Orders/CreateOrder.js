import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../../redux/orders/orderSlice';
// import { editAbout, fetchAbout } from '../../../../redux/about/aboutSlice';
// import '../CreateContent/CreateContent.css'

const CreateOrder = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const userId = user.user.status.data.id
  const clickedUserId = useSelector((state) => state.user.user.id);
//   const voicedescription = useSelector((state) => state.about.about.description);
//   const interests = useSelector((state) => state.about.about.interests);
//   const intentions= useSelector((state) => state.about.about.intentions);


//   useEffect(() => {
//     // Check if user is available before dispatching actions
//     if (clickedUserId) {
//       dispatch(fetchAbout(clickedUserId));
//     }
//     // console.log(voicedescription)
//   }, [dispatch, clickedUserId]);


  const [form, setForm] = useState({
    user_id: userId,
    title: '',
    description: '',
    price: 0.0,
    length: 0.0
  });

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    const formData = { order: form };

    dispatch(createOrder(formData));
    setForm({
        user_id: userId,
        title: '',
        description: '',
        price: 0.0,
        length: 0.0
    });
    closeForm();

    // window.location.reload();

  };

  const handleInput = (ev) => setForm({
    ...form,
    [ev.target.name]: ev.target.value,
  });

  const isOwnProfile = userId === clickedUserId

  return (

    <div className="content-creation-container">
        {!isOwnProfile && (
        <button className="open-button" onClick={openForm}>
          Make Order
        </button>
      )}

      {isFormOpen && (
        <div className="content-creation-modal">
          <div className="content-creation-form">
            <button className="close-button" onClick={closeForm}>
              Close
            </button>
            <h2>Create your order</h2>
            <form onSubmit={handleFormSubmit}>
              
              <div className="form-group">
                <label>Title:</label>
                <textarea name="title" value={form.title} onChange={handleInput} />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea name="description" value={form.description} onChange={handleInput} />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input name="price" 
                value={form.price} 
                onChange={handleInput} />
              </div><div className="form-group">
                <label>Length:</label>
                <input name="length" 
                value={form.length} 
                onChange={handleInput} />
              </div>
              
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      {/* <div className="about">
      <div className="about-item">
        <strong>My voice is:</strong>
        <span>{voicedescription || 'Nothing here yet'}</span>
      </div>
      <div className="about-item">
        <strong>I'm interested in:</strong>
        <span>{interests || 'Nothing here yet'}</span>
      </div>
      <div className="about-item">
        <strong>Looking to:</strong>
        <span>{intentions || 'Nothing here yet'}</span>
      </div>
    </div> */}
    </div>
  );
}

export default CreateOrder;


