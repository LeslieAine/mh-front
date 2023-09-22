import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LikeButton() {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div>
      <button onClick={toggleLike}>
        <FontAwesomeIcon icon={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
        {/* {liked ? 'Unlike' : 'Like'} */}
      </button>
      {/* {liked && <span>Liked!</span>} */}
    </div>
  );
}

export default LikeButton;
