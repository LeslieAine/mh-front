import React from 'react'
import OrderList from '../../creator/Orders/OrderList'

function OrderPage() {
    const orders = [
        {
          description: 'Design a website homepage',
          requestedLength: '3 days',
        },
        {
          description: 'Write a 1000-word article',
          requestedLength: '2 days',
        },
        {
          description: 'Create a logo for a company',
          requestedLength: '1 week',
        },
        {
          description: 'Translate a document to Spanish',
          requestedLength: '1 day',
        },
        {
          description: 'Develop a mobile app prototype',
          requestedLength: '5 days',
        },
      ];
      
  return (
    <div>
        <OrderList orders = {orders} />
    </div>
  )
}

export default OrderPage