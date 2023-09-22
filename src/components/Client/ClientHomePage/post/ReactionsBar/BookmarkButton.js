import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BookmarkButton() {
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div>
      <button onClick={toggleBookmark}>
        <FontAwesomeIcon icon={bookmarked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"} />
      </button>
      {/* {bookmarked && <span>Bookmarked!</span>} */}
    </div>
  );
}

export default BookmarkButton;
