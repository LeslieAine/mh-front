import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchContents } from '../../../../redux/content/contentsSlice';
import './ContentList.css';
import './ContentCard.css';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUser} from '../../../../redux/user/userSlice';

// import ReactionsBar from './ReactionsBar/ReactionsBar';

// import CreatorPostCard from './CreatorPostCard';

const CreatorContentList = () =>  {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.contents); // from Redux state structure
//   const user = useSelector((state) => state.authentication.user.status.data)
  const { id } = useParams()
  const [clickedUser, setClickedUser] = useState(null);

//   console.log(data);

//   useEffect(() => {
//     // Dispatch the fetchContent action when the component mounts
//     dispatch(fetchContents());
//   }, [dispatch]);

//   const filteredContent = data.contents.filter((content) => {
//     // Filter posts based on the user ID of the creator
//     return user ? content.user_id === user.id: true;
//   });

useEffect(() => {
    if (id) {
      // If the user ID is available in the URL params, fetch user data
      dispatch(fetchUser(id)).then((action) => {
        const user = action.payload;
        setClickedUser(user);
      });
    }

    dispatch(fetchContents());
    
  }, [dispatch, id]);

  const filteredContent = data.contents.filter((content) => {
    // Filter posts based on the user ID of the creator
    return clickedUser ? content.user.id === clickedUser.id : true;
  });

  const handleAvatarClick = (userId) => {
    // Fetch user data for the clicked avatar
    dispatch(fetchUser(userId)).then((action) => {
      const user = action.payload;
      setClickedUser(user);
    });
  };

  return (
    <div className="content-list">
      {data.isLoading ? (
        <p>Loading...</p>
      ) : (
        filteredContent.map((content) => (
          <CreatorContentCard key={content.id} content={content} />
        ))
      )}
    </div>
  );
}

const CreatorContentCard = ({ content }) => {
    return (
        <div className="content-card">
        <div className="card-header">
          <h3>{content.title}</h3>
          <p>Description: {content.description}</p>
          {/* <p>{content.numberOfBuys} Buys</p> */}
        </div>
        <div className="card-details">
          <p>Price: {content.price}</p>
          {/* <p>Length: {content.length}</p> */}
        </div>
      </div>
    );
  }
  



export default CreatorContentList;