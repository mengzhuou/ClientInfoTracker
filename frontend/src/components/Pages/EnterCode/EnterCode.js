import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnterCode.css'
import { getAccessCodes } from '../../../connector.js';

const EnterCode = () => {
  const [enterCode, setEnterCode] = useState('');
  const [accessCodes, setAccessCodes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch access codes from the backend when the component mounts
  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const codes = await getAccessCodes();
        setAccessCodes(codes);
      } catch (error) {
        console.error('Error fetching access codes:', error);
        setErrorMessage('Error fetching access codes');
      }
    };

    fetchCodes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidCode = accessCodes.some((codeObj) => codeObj.code === enterCode);

    if (isValidCode) {
      navigate('/MainPage');
    } else {
      setErrorMessage('Please enter a valid code');
    }
  };

  return (
    <div className="enter-page">
        <div className="enter-page-container">
            <p className='title'>Enter Code</p>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={enterCode}
                onChange={(e) => setEnterCode(e.target.value)}
                placeholder="Access Code"
              />
              <p className='enter-code-error'>{errorMessage}</p>
              <button className='enter-code-button' type="submit">Submit</button>
            </form>
        </div>
    </div>
  );
};

export default EnterCode;