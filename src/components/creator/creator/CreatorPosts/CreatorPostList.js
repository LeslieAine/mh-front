import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchPosts } from '../../../../redux/posts/postsSlice'; // Import the fetchPosts action
import { fetchUser} from '../../../../redux/user/userSlice';
import ReactionsBar from './ReactionsBar/ReactionsBar';
import Avatar from '../Avatar/Avatar';
import { useNavigate, useParams } from 'react-router-dom';


// import CreatorPostCard from './CreatorPostCard';

const CreatorPostList = ({user}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.posts); // from Redux state structure
//   console.log(data); 
    const [clickedUser, setClickedUser] = useState(null); // Initialize clickedUserId state
    const { id } = useParams()

//   useEffect(() => {
//     // Dispatch the fetchPosts action when the component mounts
//     dispatch(fetchPosts());
//   }, [dispatch]);

useEffect(() => {
    if (id) {
      // If the user ID is available in the URL params, fetch user data
      dispatch(fetchUser(id)).then((action) => {
        const user = action.payload;
        setClickedUser(user);
      });
    }
  }, [dispatch, id]);

  const filteredPosts = data.posts.filter((post) => {
    // Filter posts based on the user ID of the creator
    return clickedUser ? post.user.id === clickedUser.id : true;
  });

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
        filteredPosts.map((post) => (
          <CreatorPostCard key={post.id} 
            post={post} 
            user={post.user} 
            onAvatarClick={() => handleAvatarClick(post.user.id)} />
        ))
      )}
    </div>
  );
}

export default CreatorPostList;

const CreatorPostCard = ({ post, user }) => {
    const navigate = useNavigate();

    const handleUserClick = () => {
        navigate(`/creator-profile/${user.id}`);
      };
    return (
    //   <Link to={`/creator-profile/${post.user.id}`} className="post-card">
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
          <ReactionsBar />
        </div>
    //   </Link>
    );
  }
  

