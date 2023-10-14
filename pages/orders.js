import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getOrders } from '../api/orderData';
import { useAuth } from '../utils/context/authContext';
import OrderCard from '../components/OrderCard';

export default function ShowOrders() {
  // TODO: Set a state for Orders
  const [orders, setOrders] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the Orders
  const getAllTheOrders = () => {
    getOrders(user.uid).then(setOrders);
  };

  // TODO: make the call to the API to get all the Orders on component render
  useEffect(() => {
    getAllTheOrders();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <Link href="/order/new" passHref>
          <Button>Add An Order</Button>
        </Link>
        {orders.map((order) => <OrderCard key={order.firebaseKey} orderObj={order} onUpdate={getAllTheOrders} />)}
      </div>
    </>
  );
}
