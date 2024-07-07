import React from 'react';
import { Outlet } from 'react-router-dom';

// View Only
export default function Orders({ json }) {
  return (
    <div className='viewTab'>
      <Outlet />
    </div>
  );
}