import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnterCode.css'

const EnterCode = () => {
  const [enterCode, setEnterCode] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  
  const correctCode = '54321';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enterCode === correctCode) {
      navigate('/MainPage');
    } else {
      setErrorMessage('Please enter a valid code');
    }
  };

  return (
    <div className="enter-page">
        <div className="enter-page-container">
            <h2>Enter Code</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="password"
                value={enterCode}
                onChange={(e) => setEnterCode(e.target.value)}
                placeholder="Access Code"
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button type="submit">Submit</button>
            </form>
        </div>
    </div>
  );
};

export default EnterCode;