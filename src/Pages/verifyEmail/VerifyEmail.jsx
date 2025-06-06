import React from 'react'
import { useState, useRef } from 'react';
import { verifyEmail } from '../../api/services/authService';
import { useNavigate } from 'react-router-dom';
import { useUiStore } from '../../store/UiStore';

const VerifyEmail = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const loading = useUiStore((state) => state.loading);
  const setLoading = useUiStore((state) => state.setLoading);
  const inputs = useRef([]);
    const navigate = useNavigate()
  

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    setLoading(true)
    const token = code.join('');
    if (token.length === 4) {
      console.log('Verification code:', token);
      verifyEmail(token)
      navigate('/login')
      setLoading(false)
    }

  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
    
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
        <p className="text-gray-600">We've sent a 4-digit code to your device</p>
      </div>

      <div className="flex gap-3 justify-center mb-8">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={el => inputs.current[index] = el}
            type="text"
            maxLength="1"
            value={digit}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={code.join('').length < 4}
        className="w-full btn btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
        >
          <span
                className={
                  loading ? `loading loading-spinner` : ` loading-spinner`
                }
              ></span>
        Verify Code
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Didn't receive the code?{' '}
        <button className="text-blue-600 hover:underline font-medium">
          Resend
        </button>
      </p>
    </div>
  </div>
  )
}

export default VerifyEmail
