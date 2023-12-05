import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
// import OrderCard from './OrderCard';
import './OrderList.css'
import './OrderCard.css'
import { acceptOrder, fulfillOrder, madeOrders, receivedOrders, rejectOrder } from '../../../../redux/orders/orderSlice';

const OrderList = () => {
    const dispatch = useDispatch();
  const ordersReceived = useSelector((state) => state.order.receivedOrders); 
  const ordersFulfilled = useSelector((state) => state.order.fulfilledOrders); 
  const currentUser = useSelector((state) => state.authentication.user.status.data); 


  useEffect(() => {
    // Dispatch the orders action when the component mounts
    dispatch(madeOrders());
    dispatch(receivedOrders());
  }, [dispatch]);

  return (
    <div className="order-list">
        {ordersReceived.data ? (
        <div>You have received no orders yet.</div>
      ) : (
      ordersReceived.map((order, index) => (
        <OrderCard
          key={index}
          description={order.description}
          requestedLength={order.length}
          orderId = {order.id}
          acceptedById={order.accepted_by_id}
          fulfilled={order.fulfilled}
          rejectedById={order.rejected_by_id}
          price = {order.price}
        />
      ))
      )}

    </div>
  );
}

export default OrderList;


const OrderCard = ({ description, requestedLength, orderId, acceptedById, fulfilled, rejectedById, price }) => {
    const [status, setStatus] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const dispatch = useDispatch();
    const [form, setForm] = useState({
        content: ''
      });
    
      const openForm = () => {
        setIsFormOpen(true);
      };
    
      const closeForm = () => {
        setIsFormOpen(false);
      };
    
      const handleFormSubmit = (ev) => {
        ev.preventDefault();
        const formData = { content: form, orderId: orderId };
    
        dispatch(fulfillOrder(formData));
        setForm({
            content: ''
        });
        closeForm();
    
        window.location.reload();
    
      };

      const handleInput = (ev) => setForm({
        ...form,
        [ev.target.name]: ev.target.value,
      });

  
    const handleAccept = () => {
      setStatus('Accepted');
      dispatch(acceptOrder(orderId))
    };
  
    const handleReject = () => {
      setStatus('Rejected');
      dispatch(rejectOrder(orderId))
    };

    useEffect(() => {
        if (acceptedById) {
          setStatus('Accepted');
        } else if (rejectedById) {
          setStatus('Rejected');
        } else {
          setStatus(null);
        }
      }, [acceptedById]);
  
    return (
        !fulfilled && (<div className="order-card">
        <p className='card-header'>Description: {description}</p>
        <p >Requested Length: {requestedLength}</p>
        <p>Price: {price}</p>
        <p>Status: {status}</p>
        {status === 'Accepted' && (
        <button onClick={openForm}>Complete Order</button>
      )}
      {isFormOpen && (
        <div className="content-creation-modal">
          <div className="content-creation-form">
            <button className="close-button" onClick={closeForm}>
              Close
            </button>
            <h2>Upload your order content</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Content:</label>
                <textarea name="content" value={form.content} onChange={handleInput} />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      {status !== 'Accepted' && status !== 'Rejected' && (
        <div>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      )}
        {/* <button onClick={handleAccept}>Accept</button>
        <button onClick={handleReject}>Reject</button> */}
      </div>)
    );
  }
