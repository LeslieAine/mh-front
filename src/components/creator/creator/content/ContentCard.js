import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchContent } from '../../../../redux/content/contentSlice';
import './ContentCard.css';

function ContentCard({ title, numberOfBuys, price, length }) {
    const dispatch = useDispatch();

    const content = useSelector((state) => state.content.content);
    const { id } = useParams();

  useEffect(() => {
    dispatch(fetchContent(id));
  }, [dispatch, id]);

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
