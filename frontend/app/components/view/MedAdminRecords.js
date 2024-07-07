import React from 'react';
import { Outlet } from 'react-router-dom';

export default function MedAdminRecords({ json }) {
  return (
    <div class='viewTab'>
      <form>
         
      </form>
      <Outlet />
    </div>
  );
}