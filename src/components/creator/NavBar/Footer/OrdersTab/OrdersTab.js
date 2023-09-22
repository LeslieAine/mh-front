import React from 'react';

function OrdersTab({ isActive, onClick }) {
  return (
    <div className={`tab ${isActive ? 'active' : ''}`} onClick={() => onClick('orders')}>
      <i className="fas fa-bag-shopping"></i>
    </div>
  );
}

export default OrdersTab;
