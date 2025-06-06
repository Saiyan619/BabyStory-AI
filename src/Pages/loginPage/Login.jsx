import React, { useState } from 'react'
import Navbar from '../../globalcomponents/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import AlertError from '../../globalcomponents/AlertError'
import { authService, login } from '../../api/services/authService'
import { useUiStore } from '../../store/UiStore'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useUiStore((state) => state.loading);
  const setLoading = useUiStore((state) => state.setLoading);
  const error = useUiStore((state) => state.error);
  const setError = useUiStore((state) => state.setError);
  const navigate = useNavigate();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const handleLogin = async () => {
    if (email === '' || password === '') {
      console.log('empty fields');
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }
    setLoading(true);
    const credentials = { email, password };
    try {
      await login(credentials);
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('login failed:', error);
      setLoading(false);
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Starting Google login');
    setLoading(true);
    authService.googleAuth();
  };

  return (
    <div>
      {error ? <AlertError /> : ''}
      <Navbar />
      <div className='p-4'>
        <div>
          <h2 className='text-3xl text-center font-semibold'>Login to BabyStory AI</h2>
        </div>
        <div className='flex gap-5 sm:gap-0 items-center sm:items-center justify-between sm:justify-around flex-col sm:flex-row'>
          <div className='w-full sm:w-1/2 sm:mt-10'>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Email</legend>
              <input
                value={email}
                onChange={handleEmailChange}
                type='email'
                className='input w-full sm:w-3/4'
                placeholder='Type here'
              />
            </fieldset>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Password</legend>
              <input
                value={password}
                onChange={handlePasswordChange}
                type='password'
                className='input w-full sm:w-3/4'
                placeholder='Type here'
              />
            </fieldset>
            <button
              onClick={handleLogin}
              className='btn btn-primary mt-5 w-full sm:w-3/4'
            >
              <span className={loading ? `loading loading-spinner` : `loading-spinner`}></span>
              Login
            </button>
            <button
              onClick={handleGoogleLogin}
              className='btn btn-primary mt-5 w-full sm:w-3/4'
            >
              Sign in with Google
            </button>
            <div>
              <div>
                <span className='text-sm'>Dont have an account?</span>
                <Link className='underline text-sm' to='/signup'>
                  Click Here
                </Link>
              </div>
              <div>
                <Link className='underline text-sm' to='/forgotpassword'>
                  forgot password
                </Link>
              </div>
            </div>
          </div>
          <div className='w-full sm:w-1/3 sm:mt-20'>
            <img src='./6eca9ae552960466f15b7ba82bd8a467.png' alt='image' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login