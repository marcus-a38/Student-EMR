import React from 'react';
import { FormGroup } from "../components/Context";
import '../styles/forms.css';
import '../styles/Search.css';
import { currentDate } from '../utils/date-utils';

async function authorize() {



}

export default function Search() {

  async function findRecord(form) {
    const person = await fetch(form.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      body: new FormData(form)
    });
    return person.json();
  }

  return (
    <div className='Search' data-testid='searchPage'>
      <div className='searchTitle'>
        <p className='h1'><b>Patient Lookup</b></p>
      </div>
      <div className='searchInner'>
        <div className='searchMRN'>
          <FormGroup>
            <p className='h1'>Search by MRN</p>
            <form>
              <div className='inputGroup igSm txtCenter'>
                <input 
                  type='text' 
                  placeholder='e.g. 00112233' 
                  className='inputText'
                  maxLength='8'
                  required={true} />
              </div>
            </form>
          </FormGroup>
        </div>
        <hr />
        <div className='searchDetails'>
          <FormGroup>
            <p className='h1'>Search by Details</p>
            <form onSubmit={(e) => findRecord(e.target) }>
              <div className='inputGroup igMd igInl txtCenter'>
                <label for="first">First name</label>
                <input 
                  name="first"
                  type='text'
                  placeholder="First name..." 
                  minLength='3'
                  maxLength='48'
                  className='inputText' />
              </div>
              <div className='inputGroup igMd igInl txtCenter'>
                <label for="last">Last name</label>
                <input 
                  name="last"
                  type='text'
                  placeholder="Last name..."  
                  minLength='3'
                  maxLength='48'
                  className='inputText' />
              </div>
              <div className='inputGroup igMd igInl txtCenter'>
                <label for="gender">Gender</label>
                <select name="gender" defaultValue='' className='inputSelect txtCenter'>
                  <option value='0' disabled readOnly>Gender</option>
                  <option value='1'>Male</option>
                  <option value='2'>Female</option>
                  <option value='3'>Neither</option>
                </select>
              </div>
              <div className='inputGroup igMd igInl txtCenter'>
              <label for="birthdate">D.O.B.</label>
                <input 
                  name="birthdate"
                  type="date" 
                  min='1907-01-01'
                  max={currentDate()}
                  className='inputText' />
              </div>
            </form> 
          </FormGroup>
        </div>
        <div className='searchSpacer'></div>
      </div>
    </div>
  );
}