import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchContents } from '../../../../redux/content/contentsSlice';
import './ContentList.css';
import './ContentCard.css';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUser} from '../../../../redux/user/userSlice';
import { contentPurchases, createPurchase, userPurchases } from '../../../../redux/purchase/purchaseSlice';

const CreatorContentList = () =>  {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.contents); // from Redux state structure
  const currentUser = useSelector((state) => state.authentication.user.status.data)
  const currentUserId = currentUser.id
  const { id } = useParams()
  const [clickedUser, setClickedUser] = useState(null);
  const userPurchased = useSelector((state) => state.purchase.userPurchases)
//   const purchasesMade = useSelector((state) => state.contents.)

useEffect(() => {
    const fetchData = async () => {
      // Fetch user data
      const userAction = await dispatch(fetchUser(id));
      const user = userAction.payload;
      setClickedUser(user);

      // If user data is available, fetch contents
      if (user) {
        dispatch(fetchContents(user.id));
      }
    };

    fetchData();

    dispatch(userPurchases(currentUserId))

  }, [dispatch, id]);

    const filteredContent = data.contents


  return (
    <div className="content-list">
      {data.isLoading ? (
        <p>Loading...</p>
      ) : (
        filteredContent.map((content) => (
          <CreatorContentCard key={content.id} 
          content={content} 
          contentId = {content.id}
          contentPurchases = {content.purchases}
          userPurchased = {userPurchased}
          currentUserId = {currentUserId} />
        ))
      )}
    </div>
  );
}

const CreatorContentCard = ({ content, contentId, userPurchased, contentPurchases }) => {

    const dispatch = useDispatch();
    const [form, setForm] = useState({
        content_id: contentId
      });

    const formData = { purchase: form, contentId: contentId };

      
    const handleBuy = () => {
        // Dispatch the buyContent action when the "Buy" button is clicked
        dispatch(createPurchase(formData));
        setForm({
            content_id: contentId
        });
      };

    // Check if the contentId appears in userPurchased array
    const isContentPurchased = userPurchased.length > 0 && userPurchased.some((purchase) => purchase.id === contentId);

    // const numberOfPurchases = contentPurchases.length;
    const numberOfPurchases = contentPurchases.length > 0 ? contentPurchases.length : 0;


    return (
    <div className="content-card">
        <div className="card-header">
          <h3>{content.title}</h3>
          <p>Description: {content.description}</p>
        </div>
        <div className="card-details">
          <p>Price: {content.price}</p>
          <p>Number of Buys: 
            {numberOfPurchases}
            </p>
          {isContentPurchased ? (
          <p>Already Bought</p>
        ) : (
          <button onClick={handleBuy}>Buy</button>
        )}
          {/* <button onClick={handleBuy}>Buy</button> */}
          {/* <p>Length: {content.length}</p> */}
        </div>
      </div>
    );
  }
  

export default CreatorContentList;