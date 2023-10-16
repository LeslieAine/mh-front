// import React from 'react';
// import ContentCard from './ContentCard';
// import './ContentList.css';

// function ContentList({ contentData }) {
//   return (
//     <div className="content-list">
//       {contentData.map((item, index) => (
//         <ContentCard
//           key={index}
//           title={item.title}
//           numberOfBuys={item.numberOfBuys}
//           price={item.price}
//           length={item.length}
//         />
//       ))}
//     </div>
//   );
// }

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchContents } from '../../../../redux/content/contentsSlice';
import './ContentList.css';
import './ContentCard.css';

// import ReactionsBar from './ReactionsBar/ReactionsBar';

// import CreatorPostCard from './CreatorPostCard';

function ContentList() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.contents); // from Redux state structure
//   console.log(data);

  useEffect(() => {
    // Dispatch the fetchPosts action when the component mounts
    dispatch(fetchContents());
  }, [dispatch]);

  return (
    <div className="content-list">
      {data.isLoading ? (
        <p>Loading...</p>
      ) : (
        data.contents && data.contents.map((content) => (
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
