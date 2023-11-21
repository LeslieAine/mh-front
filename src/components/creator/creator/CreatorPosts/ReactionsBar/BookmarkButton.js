// // BookmarkButton.jsx
// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useDispatch, useSelector } from 'react-redux';
// // import { toggleBookmark } from '../redux/bookmarks/bookmarksSlice';

// function BookmarkButton({ postId }) {
//   const dispatch = useDispatch();
//   const bookmarks = useSelector((state) => state.bookmarks);
//   const [bookmarked, setBookmarked] = useState(false);

//   // Check if the post is already bookmarked
//   useEffect(() => {
//     setBookmarked(bookmarks.includes(postId));
//   }, [bookmarks, postId]);

//   const handleToggleBookmark = () => {
//     // dispatch(toggleBookmark(postId));
//   };

//   return (
//     <div>
//       <button onClick={handleToggleBookmark}>
//         <FontAwesomeIcon icon={bookmarked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"} />
//       </button>
//       {/* {bookmarked && <span>Bookmarked!</span>} */}
//     </div>
//   );
// }

// export default BookmarkButton;






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
