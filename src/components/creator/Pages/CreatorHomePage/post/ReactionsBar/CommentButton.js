import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CommentButton() {
  const [commented, setCommented] = useState(false);

  const toggleComment = () => {
    setCommented(!commented);
  };

  return (
    <div>
      <button onClick={toggleComment}>
        <FontAwesomeIcon icon= "fa-regular fa-comment" />
      </button>
      {commented && (
        <div>
          <textarea placeholder="Write a comment..." />
          <button>Submit</button>
        </div>
      )}
    </div>
  );
}

export default CommentButton;
