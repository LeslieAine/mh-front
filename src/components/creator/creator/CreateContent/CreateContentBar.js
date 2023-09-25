import React, { useState } from 'react';
import CreateContent from './CreateContent'; // Import the pop-up component
import './CreateContent.css'

function ContentCreationBar() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // Function to open the pop-up
  const openPopUp = () => {
    setIsPopUpOpen(true);
  };

  // Function to close the pop-up
  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

  return (
    <div>
      <button className="content-creation-button" onClick={openPopUp}>
        <i className="fas fa-upload"></i>
        Upload content
      </button>

      {/* Render the pop-up when isPopUpOpen is true */}
      {isPopUpOpen && (
        <CreateContent onClose={closePopUp} />
      )}
    </div>
  );
}

export default ContentCreationBar;

