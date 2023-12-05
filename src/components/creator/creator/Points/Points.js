import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBalance } from '../../../../redux/balance/balanceSlice';
  

const Points = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.authentication.user.status.data);
  const userId = currentUser.id
  const points = useSelector((state) => state.balance.balance.balance);

  useEffect(() => {
    dispatch(fetchBalance(userId))
  }, [dispatch]);

  return <p className="points">{points} Points </p>;
}

export default Points;
