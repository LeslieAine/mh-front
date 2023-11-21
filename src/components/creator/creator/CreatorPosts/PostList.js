import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchPosts } from '../../../../redux/posts/postsSlice'; // Import the fetchPosts action
import { fetchUser} from '../../../../redux/user/userSlice';
import ReactionsBar from './ReactionsBar/ReactionsBar';
import Avatar from '../Avatar/Avatar';
import { Icon } from "@iconify/react";
import { useNavigate } from 'react-router-dom';
import { addLike, deleteLike, addBookmark, deleteBookmark } from '../../../../redux/posts/postsSlice';


// import CreatorPostCard from './CreatorPostCard';

const PostList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.posts); // from Redux state structure
//   console.log(data); 
  const currentUser = useSelector((state) => state.authentication.user.status.data); 

    const [clickedUser, setClickedUser] = useState(null); // Initialize clickedUserId state
  // const user = useSelector((state) => state.authentication.user.status.data); 


  useEffect(() => {
    // Dispatch the fetchPosts action when the component mounts
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAvatarClick = (userId) => {
    // Fetch user data for the clicked avatar
    dispatch(fetchUser(userId)).then((action) => {
      const user = action.payload;
      setClickedUser(user);
    });
  };

  return (
    <div className="post-list">
      {data.isLoading ? (
        <p>Loading...</p>
      ) : (
        data.posts && data.posts.map((post) => (
          <PostCard key={post.id} 
            post={post} 
            user={post.user} 
            currentUser = {currentUser}
            onAvatarClick={() => handleAvatarClick(post.user.id)} />
        ))
      )}
    </div>
  );
}

export default PostList;

const PostCard = ({ post, user, currentUser }) => {
    const navigate = useNavigate();
  const dispatch = useDispatch();

    const handleUserClick = () => {
        navigate(`/creator-profile/${user.id}`);
      };

    const usersLike = () =>
    post.likes.find((like) => like.user_id === currentUser.id && like.post_id === post.id);


    const handleLikes = () => {
      const likeCount = post.likes.length;
    
      let isCurrentUserLiked = false;
      for (let i = 0; i < post.likes.length; i++) {
        if (post.likes[i].user_id === currentUser.id) {
          isCurrentUserLiked = true;
          break; // Exit the loop once a match is found
        }
      }
    
      if (!isCurrentUserLiked) {
        return (
          <div>
            <Icon
              icon="fluent:heart-20-regular"
              width="30"
              height="30"
              className="likeButton"
              onClick={() => dispatch(addLike(post.id, currentUser.id))}
            />
            {likeCount}
          </div>
        );
      } else {
        return (
          <div>
            <Icon
              icon="fluent:heart-20-filled"
              width="30"
              height="30"
              className="unlikeButton"
              color="#ed4956"
              // onClick={() => dispatch(deleteLike(currentUser.id, post.id, usersLike()))}
              onClick={() => 
              {
                const userLike = usersLike();
                if (userLike) {
                  const likeId = parseInt(userLike.id)

                  console.log(likeId)

                  // dispatch(deleteLike(post.id, likeId));
                  dispatch(deleteLike({postId: post.id, likeId }));

                } else {
                  console.error("User like not found");
                }
              }}
            />
            {likeCount}
          </div>
        );
      }
    };


    const usersBookmark = () =>
    post.bookmarks.find((bookmark) => bookmark.user_id === currentUser.id && bookmark.post_id === post.id);


    const handleBookmarks = () => {
      const bookmarkCount = post.bookmarks.length;
    
      let isCurrentUserBookmarked = false;
      for (let i = 0; i < post.bookmarks.length; i++) {
        if (post.bookmarks[i].user_id === currentUser.id) {
          isCurrentUserBookmarked = true;
          break; // Exit the loop once a match is found
        }
      }
    
      if (!isCurrentUserBookmarked) {
        return (
          <div>
            <Icon
              icon="fluent:bookmark-16-regular"
              width="30"
              height="30"
              className="bookmarkButton"
              onClick={() => dispatch(addBookmark(post.id, currentUser.id))}
            />
            {bookmarkCount}
          </div>
        );
      } else {
        return (
          <div>
            <Icon
              icon="fluent:bookmark-16-filled"
              width="30"
              height="30"
              className="unbookmarkButton"
              color="#ed4956"
              // onClick={() => dispatch(deletebookmark(currentUser.id, post.id, usersbookmark()))}
              onClick={() => 
              {
                const userBookmark = usersBookmark();
                if (userBookmark) {
                  const bookmarkId = parseInt(userBookmark.id)

                  console.log(bookmarkId)

                  // dispatch(deletebookmark(post.id, bookmarkId));
                  dispatch(deleteBookmark({postId: post.id, bookmarkId }));

                } else {
                  console.error("User bookmark not found");
                }
              }}
            />
            {bookmarkCount}
          </div>
        );
      }
    };


    return (
        <div className="postcard">
          <div onClick={handleUserClick} className="user-info">
            <img className="post-card-avatar" src={post.user.avatar} alt={`${post.user.username}'s Avatar`} />
            {/* <Avatar className="post-card-avatar" src={post.user.avatar} 
                alt={`${post.user.username}'s Avatar`} 
                user={post.user}  
                onClick={() => onAvatarClick(post.user.id)} 
            /> */}
            <span className="post-card-username">{post.user.username}</span>
          </div>
          <div className="content">
            <p>{post.content}</p>
          </div>
          {handleLikes()}
          {handleBookmarks()}
          <ReactionsBar />
        </div>
    //   </Link>
    );
  }