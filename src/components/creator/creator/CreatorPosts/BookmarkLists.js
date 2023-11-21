import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks } from '../redux/bookmarks/bookmarksSlice';
import Post from './Post'; // Assume you have a Post component

const BookmarksList = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks);

  useEffect(() => {
    // Fetch bookmarks when the component mounts
    dispatch(fetchBookmarks());
  }, [dispatch]);

  return (
    <div>
      <h2>Bookmarked Posts</h2>
      {bookmarks.map((postId) => (
        <Post key={postId} postId={postId} />
      ))}
    </div>
  );
}

export default BookmarksList;
