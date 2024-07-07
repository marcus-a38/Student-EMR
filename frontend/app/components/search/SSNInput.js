import React, {useState} from 'react';

export default function SSNInput() {

  const [ssn, setSsn] = useState('');

  const formatSsn = (val) => {

    let clean = val.replace(/\D/g, '');
    let formatted = '';

    for (let i = 0; i < clean.length; i++) {
      if (i === 3 || i === 5) {
        formatted += '-';
      }
      formatted += clean[i];
    }
    return formatted;

  }

  const handleChange = (e) => {
    const input = e.target.value;
    if (input.length <= 11) {
      const formatted = formatSsn(input);
      setSsn(formatted);
    }
  };

  return (
    <input
      type='text'
      className='inputText'
      value={ssn}
      onChange={handleChange}
      maxLength='11'
      placeholder='SSN (xxx-xx-xxxx)'
    />
  );

}