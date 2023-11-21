import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchContents } from '../../../../redux/content/contentsSlice';
import './ContentList.css';
import './ContentCard.css';

// import ReactionsBar from './ReactionsBar/ReactionsBar';

// import CreatorPostCard from './CreatorPostCard';

const ContentList = () =>  {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.contents); // from Redux state structure
  const user = useSelector((state) => state.authentication.user.status.data)
//   console.log(data);

  useEffect(() => {
    // Dispatch the fetchContent action when the component mounts
    dispatch(fetchContents());
  }, [dispatch]);

  const filteredContent = data.contents.filter((content) => {
    // Filter posts based on the user ID of the creator
    return user ? content.user_id === user.id: true;
  });

  return (
    <div className="content-list">
      {data.isLoading ? (
        <p>Loading...</p>
      ) : (
        filteredContent.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))
      )}
    </div>
  );
}

const ContentCard = ({ content }) => {
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
  



export default ContentList;
