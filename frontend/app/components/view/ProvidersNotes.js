import React from 'react';
import { Outlet } from 'react-router-dom';

// View Only
export default function ProvidersNotes({ json }) {
  return (
    <div className='viewTab'>
      <div className='providerHistoryPresent'>
        <p></p>
      </div>
      <div className='providerHistoryPast'>
        <p></p>
      </div>
      <div className='providerHistorySocial'>
        <p></p>
      </div>
      <Outlet />
    </div>
  );
}