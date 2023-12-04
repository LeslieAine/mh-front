import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './OrderList.css'
import './OrderCard.css'
import { fulfillOrder, madeOrders, receivedOrders } from '../../../../redux/orders/orderSlice';

const MadeOrders = () => {
    const dispatch = useDispatch();
  const ordersReceived = useSelector((state) => state.order.receivedOrders);
  const ordersFulfilled = useSelector((state) => state.order.fulfilledOrders);
  const ordersMade = useSelector((state) => state.order.madeOrders);
  const currentUser = useSelector((state) => state.authentication.user.status.data);
  const userId = currentUser.id
//   const acceptedBy = useSelector((state) => state.order.madeOrders.accepted_by_id); 


  useEffect(() => {
    // Dispatch the orders action when the component mounts
    dispatch(madeOrders(userId));
  }, [dispatch]);

//   if (ordersMade.length === 0) {
//     return <div>You have made no orders yet.</div>;
//   }

  return (
    <div className="order-list">
      {ordersMade.data ? (
        <div>You have made no orders yet.</div>
      ) : (
        ordersMade.map((order, index) => (
          <OrderCard
            key={index}
            description={order.description}
            requestedLength={order.length}
            acceptedBy={order.accepted_by_id}
            fulfilled={order.fulfilled}
          />
        ))
      )}
    </div>
  );
}

export default MadeOrders;


const OrderCard = ({ description, requestedLength, acceptedBy, fulfilled }) => {

    const status = acceptedBy !== null ? 'Accepted' : 'Pending';
  
    return (
        !fulfilled && (
            <div className="order-card">
              <p className='card-header'>Description: {description}</p>
              <p>Requested Length: {requestedLength}</p>
              <p>Status: {status}</p>
            </div>)

    );
  }
