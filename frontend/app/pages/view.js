import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Loader from '../components/Loader';  
import { FormGroup } from '../components/Context';
import PatientDetails from '../components/view/PatientDetails';
import '../styles/View.css';
import '../styles/components/table.css';

// Using lazy imports for the view tabs, better page performance AND added benefit
// of react-router-dom out-of-the-box solution to this page.
const VitalSigns = lazy(() => import('../components/view/VitalSigns'));
const ProvidersNotes = lazy(() => import('../components/view/ProvidersNotes'));
const Orders = lazy(() => import('../components/view/Orders'));
const NursesNotes = lazy(() => import('../components/view/NursesNotes'));
const MedAdminRecords = lazy(() => import('../components/view/MedAdminRecords'));
const DiagnosticResults = lazy(() => import('../components/view/DiagnosticResults'));

export default function View({ json }) {

  const [active, setActive] = useState('VitalSigns');

  // Credits to https://stackoverflow.com/a/72335907
  function classMerger(...args) {
    return args.filter((c) => c).join(" ");
  };

  // Perhaps we can change this logic to use a StaticRouter with lazy loading?
  function ViewTabButton({type, text}) {

    const defaultTabColor = '#e0e0e0';
    const hoverTabColor = '#c4c4c4';
    const [isHovering, setIsHovering] = useState(false);

    return (
      <div
        className={classMerger('ViewTabButton', type, active === type && 'active')}
        onClick={() => setActive(type)}
        onMouseEnter={()=> {setIsHovering(true)}}
        onMouseLeave={()=>{setIsHovering(false)}}
      >
        <Link to={`/${active}`}>
          <div className='viewTabButtonPoly'>
            <svg 
              fill={isHovering ? hoverTabColor:defaultTabColor} 
              width="100%" 
              height="100%" 
              viewBox="0 0 100 100" 
              xmlns="http://www.w3.org/2000/svg" 
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="black" floodOpacity="0.5"/>
                </filter>
              </defs>
              <polygon points="15,0 85,0 100,100 0,100"/>
            </svg>
          </div>
          <p className='viewTabButtonContent'>{text}</p>
        </Link>
      </div>
    );
  }

  return (
    <div className='View' data-testid='viewPage'>
      <p className='h1'>Patient Details</p>
      <PatientDetails />
      <div className='toggler'>
        <ViewTabButton type='VitalSigns' text='Vital Signs' />
        <ViewTabButton type='NursesNotes' text="Nurse's Notes" />
        <ViewTabButton type='Diagnostics' text='Diagnostic Results' />
        <ViewTabButton type='MedAdminRecord' text='MAR' />
        <ViewTabButton type='Orders' text='Orders' />
        <ViewTabButton type='ProviderNotes' text="Provider's Notes" />
      </div>
      <div className='patientViewer'>
        <FormGroup>
          <Suspense fallback={<Loader />}>
            <Route path='/view'>
              <Route path='/vitalsigns' element={<VitalSigns />} />
              <Route path='/nursesnotes' element={<NursesNotes />} />
              <Route path='/diagnostics' element={<DiagnosticResults />} />
              <Route path='/medication' element={<MedAdminRecords />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/providersnotes' element={<ProvidersNotes />} />
            </Route>
          </Suspense>
        </FormGroup>
      </div>
    </div>
  );
}