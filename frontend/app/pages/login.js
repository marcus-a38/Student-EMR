import React, {useState, useRef, useContext } from 'react';
import { Router, Navigate, useLocation, useNavigate } from 'react-router-dom';
import request from '../api';
import FormContext, { FormGroup } from '../components/Context';
import '../styles/Login.css';
import '../styles/forms.css'; 

export default function Login({authHook}) {

  /* States and Refs */
  const [alert, setAlert] = useState('jjjj');
  const [bannerExpanded, setBannerExpanded] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const buttonRef = useRef(null);
  var {location, authentication} = useLocation();
  const navigate = useNavigate();
  location = location == undefined ? 'login' : location;

  /* Handle Submit */
  const handleSubmit = async (e) => {

    e.preventDefault();
    /*
    const userData = Object.fromEntries(new FormData(e.target));
    console.table(userData);

    const res = await request('login', userData);

    if (res.success) {
      authHook(true);
      console.log(`Login succeeded: ${res.body.message}`)
    } else {
      authHook(false);
      setAlert(res.error.message);
      console.error(`Login failed: ${res.error.message}`);
    }*/
    authentication = true;
    console.table({location, authentication});
    return authentication;
  };

  /* Focuses on the login button, used for honeypot field */
  const focusLoginButton = async () => {
    await buttonRef.current.focus();
  }

  return (
    <div className='Login' data-testid='loginPage'>
      <div id='loginForm'>
        <p className='h1'>Student Login</p>
        { alert !== '' && ( 
          <div className='alert'>
            <p className='inlineBlock'>{alert}</p>
            <button 
              className='inlineBlock closeButton'
              type='button' 
              onClick={() => {setAlert('')}}
              aria-labelledby='Close Alert'>
              x
            </button>
          </div> 
        )}
        <form 
          method="POST" 
          onSubmit={() =>
            navigate('/', {
              state: {location: location, authentication: handleSubmit.bind(this)}
            })
          }>
          <div className='inputGroup'>
            <input 
              type='text' 
              name='username' 
              className='inputText'
              placeholder='Username...'
              minLength='28'
              maxLength='36'
              required={true} />
          </div>
          <div id='passwordGroup'>
            <input 
              type={showPassword ? 'text' : 'password'} 
              name='password' 
              className='inputText'
              placeholder='Password...'
              required={true} />
            <img 
              id='showPasswordToggler'
              alt="Toggle Password"
              src={showPassword ? 'hidePass.png' : 'showPass.png'} 
              onClick={() => {setShowPassword(!showPassword)}} />
          </div>
          <div className='fieldSecret'>
            <input className='fieldSecret' type='text' name='phone'
              onFocus={focusLoginButton}/>
          </div>
          <div className='inputGroup'>
            <input type='checkbox' name='remember' />
            <label htmlFor='remember'>Remember me?</label>
          </div>
          <button type='submit' className='SubmitButton' ref={buttonRef}>
            Login
          </button>
        </form>
        <small>Can't Login? Contact the Department Chair.</small>
      </div>
    </div>
  );
}