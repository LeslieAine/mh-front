import React, { useState } from 'react';
import './OrderCard.css'

function OrderCard({ description, requestedLength, onAccept, onReject }) {
  const [status, setStatus] = useState(null);

  const handleAccept = () => {
    setStatus('Accepted');
    onAccept(); // You can implement this function to handle the accept action
  };

  const handleReject = () => {
    setStatus('Rejected');
    onReject(); // You can implement this function to handle the reject action
  };

  return (
    <div className="order-card">
      <p className='card-header'>Description: {description}</p>
      <p >Requested Length: {requestedLength}</p>
      <p>Status: {status}</p>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
}

export default OrderCard;
