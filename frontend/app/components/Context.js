import React, { useState, createContext, useCallback } from 'react';

const FormContext = createContext();

export function FormGroup({ children, action, buttonRef }) {
  const [reqBody, setReqBody] = useState({});
  const [alert, setAlert] = useState(null);

  const updateForms = useCallback((formName, data) => {
    setReqBody(prevReq => ({
      ...prevReq,
      [formName]: data
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Req body:', reqBody);
    Promise.resolve(action(reqBody)).then((res) => {
      console.log(res);
    });
  };

  /* Add alert box before children */
  return (
    <FormContext.Provider value={{ reqBody, updateForms }}>
      <div className="FormGroup">
        {children}
        <button className='SubmitButton' onClick={handleSubmit} ref={buttonRef}>
          Submit
        </button>
      </div>
    </FormContext.Provider>
  );
}

export default FormContext;