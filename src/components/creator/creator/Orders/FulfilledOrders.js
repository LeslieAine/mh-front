import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
// import OrderCard from './OrderCard';
import './OrderList.css'
import './OrderCard.css'
import { creatorFulfilled, fulfillOrder, madeOrders, receivedOrders } from '../../../../redux/orders/orderSlice';

const FulfilledOrders = () => {
    const dispatch = useDispatch();
  const ordersReceived = useSelector((state) => state.order.receivedOrders); 
  const ordersFulfilled = useSelector((state) => state.order.creatorFulfilledOrders); 
  const currentUser = useSelector((state) => state.authentication.user.status.data);
  const userId = currentUser.id


  useEffect(() => {
    // Dispatch the orders action when the component mounts
    dispatch(creatorFulfilled(userId))
  }, [dispatch]);

  return (
    <div className="order-list">
        {ordersFulfilled.data ? (
        <div>You have made no orders yet.</div>
      ) : (
      ordersFulfilled.map((order, index) => (
        <OrderCard
          key={index}
          description={order.description}
          requestedLength={order.length}
          content = {order.fulfilled}
          price = {order.price}
        />
      ))
      )}
    </div>
  );
}

export default FulfilledOrders;


const OrderCard = ({ description, requestedLength, content, price }) => {

  
    return (
      <div className="order-card">
        <p className='card-header'>Description: {description}</p>
        <p >Requested Length: {requestedLength}</p>
        <p >Price: {price}</p>
        <p>Content: {content}</p>
        {/* <button onClick={handleAccept}>Accept</button>
        <button onClick={handleReject}>Reject</button> */}
      </div>
    );
  }
