/* Dependencies */
import React, { Suspense, lazy, useState } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, Route, Navigate, 
  useLocation 
} from 'react-router-dom';
import Loader from './components/Loader';
import logo from './logo.svg';

/* Global Styles */
import './styles/App.css';

// Using lazy imports for the pages, better site-wide performance
const Login = lazy(() => import('./pages/login'));
const Search = lazy(() => import('./pages/search'));
const View = lazy(() => import('./pages/view'));
const Results = lazy(() => import('./pages/results'));

export default function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

function AppInner() {

  const {location, authentication} = useLocation();

  const [auth, setAuth] = useState(
    authentication !== undefined ? authentication : false
  );

  const navigationState = {
    from: location,
    authentication: auth
  };

  const [timedOut, setTimedOut] = useState(false);

  return (
    <Suspense fallback={<Loader />}>
      <div className="App" data-testid="App">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/search' element={!auth ? 
            <Search /> : <Navigate to='/login' state={navigationState} replace />
          } />
          <Route path='/results' element={!auth ? 
            <Results /> : <Navigate to='/login' state={navigationState} replace />
          } />
          <Route path='/' element={!auth ? 
            <Navigate to='/search' state={navigationState} /> : 
            <Navigate to='/login' state={navigationState} replace />
          } />
        </Routes>
      </div>
    </Suspense>
  );
}