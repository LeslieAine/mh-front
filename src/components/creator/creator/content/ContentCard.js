import React from 'react';
import './ContentCard.css';

function ContentCard({ title, numberOfBuys, price, length }) {
  return (
    <div className="content-card">
      <div className="card-header">
        <h3>{title}</h3>
        <p>{numberOfBuys} Buys</p>
      </div>
      <div className="card-details">
        <p>Price: {price}</p>
        <p>Length: {length}</p>
      </div>
    </div>
  );
}

export default ContentCard;
