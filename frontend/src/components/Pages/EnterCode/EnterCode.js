import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnterCode.css'

const EnterCode = () => {
  const [enterCode, setEnterCode] = useState('');
  const navigate = useNavigate();

  const correctCode = '54321';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enterCode === correctCode) {
      navigate('/MainPage');
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
            <button type="submit">Submit</button>
            </form>
        </div>
    </div>
  );
};

export default EnterCode;