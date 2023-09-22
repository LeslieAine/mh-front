import React from 'react';
import OrderCard from './OrderCard';
import './OrderList.css'

function OrderList({ orders }) {
  return (
    <div className="order-list">
      {orders.map((order, index) => (
        <OrderCard
          key={index}
          description={order.description}
          requestedLength={order.requestedLength}
        />
      ))}
    </div>
  );
}

export default OrderList;
