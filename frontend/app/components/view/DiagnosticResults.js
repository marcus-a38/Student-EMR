import React from 'react';
import { Outlet } from 'react-router-dom';

// View Only
export default function DiagnosticResults({ json }) {
  return (
    <div class='viewTab'>
      <div className='diagnosticsHematology'>
        <table>
          <caption>Hematology (CBC)</caption>
        
        </table>
      </div>
      <div className='diagnosticsMetabolic'>
        <table>
          <caption>Metabolic Panel</caption>
        
        </table>
      </div>
      <div className='diagnosticsLiver'>
        <table>
          <caption>Liver Panel</caption>
        
        </table>
      </div>
      <div className='diagnosticsMisc'>
        <table>
          <caption>Hematology (CBC)</caption>
        
        </table>
      </div>
      <div className='diagnosticsCoags'>
        
      </div>
      <div className='diagnosticsCardiac'>
        
      </div>
      <div className='diagnosticsUrinalysis'>
        
      </div>
      <div className='diagnosticsUaMicro'>
        
      </div>
      <div className='diagnosticsAbg'>
        
      </div>
      <div className='diagnosticsRadiology'>
        
      </div>

      <Outlet />
      
    </div>

  );
}