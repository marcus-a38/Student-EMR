import React from "react";
import { Outlet } from 'react-router-dom';
import {dateToAge} from "../../utils/date-utils";
import '../../styles/components/grid.css';

export default function PatientDetails(json) {

  let name = 0;

  const convertWeightUnits = () => {

  }

  const convertHeightUnits = () => {
    
  }

  return (
    <div className="PatientDetails">
      <div className="ctnr sm">
        <div className="row">
          <div className="col">
            <p><strong>MRN</strong></p>
            <p>
              <span style={{userSelect: 'none'}}><strong>#</strong>&nbsp;</span>
              00112233
            </p>
          </div>
          <div className="col">
            <p><strong>Full name</strong></p>
            <p>Marcus Antonelli</p>
          </div>
          <div className="col">
            <p><strong>Date of birth</strong></p>
            <p>06/17/2003</p>
          </div>
        </div>
        <div className="row">
          <div class="col">
            <p><strong>Religion</strong></p>
            <p>N/A</p>
          </div>
          <div className="col">
            <p className="inlineBlock"><strong>Height</strong></p>
            <img 
              src='/convertIcon.png' 
              alt='Convert units' 
              className='convertUnits' 
              onClick={convertHeightUnits} 
            />
            <p>5ft 8in</p>
          </div>
          <div className="col">
            <p className="inlineBlock"><strong>Weight</strong></p>
            <img 
              src='/convertIcon.png' 
              alt='Convert units' 
              className='convertUnits'
              onClick={convertWeightUnits} 
            />
            <p>135 lb.</p>
          </div>
          
        </div>
      </div>
      <Outlet />
    </div>
  );

}