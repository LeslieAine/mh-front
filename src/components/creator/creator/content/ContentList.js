import React from 'react';
import ContentCard from './ContentCard';
import './ContentList.css';

function ContentList({ contentData }) {
  return (
    <div className="content-list">
      {contentData.map((item, index) => (
        <ContentCard
          key={index}
          title={item.title}
          numberOfBuys={item.numberOfBuys}
          price={item.price}
          length={item.length}
        />
      ))}
    </div>
  );
}

export default ContentList;
