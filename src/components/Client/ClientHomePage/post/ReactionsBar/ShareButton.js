import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ShareButton() {
  const [shared, setShared] = useState(false);

  const toggleShare = () => {
    setShared(!shared);
  };

  return (
    <div>
      <button onClick={toggleShare}>
      <FontAwesomeIcon icon='fa-solid fa-share' />
        {/* {shared ? 'Close Share' : 'Share'} */}
      </button>
      {shared && (
        <div>
          <input
            type="text"
            placeholder="Enter email or username"
          />
          <button>Send</button>
        </div>
      )}
    </div>
  );
}

export default ShareButton;
