/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <img alt="User Profile" src={user.photoURL} />
      <h1>{user.displayName}</h1>
      <h2>{user.email}</h2>
    </>
  );
}
