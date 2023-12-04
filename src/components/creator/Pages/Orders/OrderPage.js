import React from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OrderList from '../../creator/Orders/OrderList'
import './OrderPage.css'

const OrderPage = () => {

  const userId = useSelector((state) => state.authentication.user.status.data.id); 


  return (
    <div>
        {/* <OrderList /> */}
        <nav>
        <Link className='nav-link' to={`/creator-homepage/orders/${userId}/made-orders`}>Made</Link>
        <Link className='nav-link' to={`/creator-homepage/orders/${userId}/fulfilled-orders`}>Completed</Link>
        <Link className='nav-link' to={`/creator-homepage/orders/${userId}/received-orders`}>Received</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default OrderPage