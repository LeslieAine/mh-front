import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContents } from '../../../../redux/content/contentsSlice';
import './ContentList.css';
import './ContentCard.css';
// import { contentPurchases, createPurchase } from '../../../../redux/purchase/purchaseSlice';

const ContentList = () =>  {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.contents); // from Redux state structure
  const user = useSelector((state) => state.authentication.user.status.data)
  const userId = user.id
//   console.log(data);

  useEffect(() => {
    // Dispatch the fetchContent action when the component mounts
    dispatch(fetchContents(userId));
  }, [dispatch]);

  const filteredContent = data.contents

  return (
    <div className="content-list">
      {data.isLoading ? (
        <p>Loading...</p>
      ) : (
        filteredContent.map((content) => (
          <ContentCard 
            key={content.id} 
            content={content}
            contentId = {content.id} />
        ))
      )}
    </div>
  );
}

const ContentCard = ({ content }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {

//     dispatch(contentPurchases(contentId));

//   }, [dispatch]);

//     const handleBuy = () => {
//         // Dispatch the buyContent action when the "Buy" button is clicked
//         dispatch(createPurchase(content.id));
//       };


    return (
        <div className="content-card">
        <div className="card-header">
          <h3>{content.title}</h3>
          <p>Description: {content.description}</p>
          {/* <p>{content.numberOfBuys} Buys</p> */}
        </div>
        <div className="card-details">
          <p>Price: {content.price}</p>
          {/* <button onClick={handleBuy}>Buy</button> */}
          {/* <p>Buys: {content.length}</p> */}
        </div>
      </div>
    );
  }
  



export default ContentList;
