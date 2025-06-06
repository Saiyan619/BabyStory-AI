import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUiStore } from '../../store/UiStore';
import { useAuthStore } from '../../store/authStore';
import { Me } from '../../api/services/authService';

function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);
    const setToken = useAuthStore((state) => state.setToken);
    const setLoading = useUiStore((state) => state.setLoading);
    const setError = useUiStore((state) => state.setError);
  
    useEffect(() => {
      const handleCallback = async () => {
        const token = searchParams.get('token');
        console.log('Callback token:', token);
        if (token) {
          setLoading(true);
          try {
            localStorage.setItem('token', token);
            setToken(token);
            const user = await Me();
            setUser(user);
            console.log('User data fetched successfully:', user);
            setLoading(false);
            navigate('/dashboard');
          } catch (error) {
            console.error('Auth callback error:', error);
            setLoading(false);
            setError(true);
            setTimeout(() => setError(false), 3000);
            navigate('/login');
          }
        } else {
          console.error('No token in callback');
          setError(true);
          setTimeout(() => setError(false), 3000);
          navigate('/login');
        }
      };
      handleCallback();
    }, [searchParams, navigate, setUser, setToken, setLoading, setError]);
  
    return (
      <div className='p-4 text-center'>
        <h2 className='text-3xl text-center font-semibold'>Processing...</h2>
      </div>
    );
  }
  
  export default AuthCallback;