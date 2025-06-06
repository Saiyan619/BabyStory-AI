import React from 'react'
import Navbar from '../../globalcomponents/Navbar'
import { forgotPassword } from '../../api/services/authService'
import { useState } from 'react'
import AlertSucces from '../../globalcomponents/AlertSucces'
import { useUiStore } from '../../store/UiStore'
import AlertError from '../../globalcomponents/AlertError'

const ForgotPassword = () => {
    const [resetEmail, setResetEmail] = useState('')
    const message = useUiStore((state) => state.message);
    const setMessage = useUiStore((state) => state.setMessage);
    const success = useUiStore((state) => state.success);
    const setSuccess = useUiStore((state) => state.setSuccess);
    const loading = useUiStore((state) => state.loading);
    const setLoading = useUiStore((state) => state.setLoading);
    const error = useUiStore((state) => state.error);
    const setError = useUiStore((state) => state.setError);

    const requestPasswordReset = async () => {
        console.log("Reset email:", resetEmail)
        if (!resetEmail) {
            console.error("Email is required")
            setError(true);
            setTimeout(() => setError(false), 3000);
            return
        }
        setLoading(true)
        try {
            await forgotPassword(resetEmail)
            setSuccess(true)
            setMessage("Password reset link sent to your email")
            setTimeout(() => setMessage(""), 3000)
            setTimeout(() => setSuccess(""), 3000)
            setLoading(false)
        } catch (error) {
            setError(true);
            setTimeout(() => setError(false), 3000);
            setLoading(false)
            console.error(error)
        }
    }

  return (
      <div>
          <Navbar />
          {success ? <AlertSucces message={message} /> : ""}
                  {error ? <AlertError /> : "" }
       
          <div className='flex item-center justify-center text-center flex-col mt-10 gap-6'>
              <div>
                  <span className='text-2xl font-semibold'>Forgot Password</span>
                  <p>Enter the Email Address associated with your account and we will send you a link to rest your password</p>
              </div>

              <div className='flex flex-col m-auto gap-2'>
                  <input onChange={(e)=>setResetEmail(e.target.value)} placeholder='Enter Email' type="text" className='input' />
                  <button onClick={requestPasswordReset} className='btn btn-primary'>
                  <span className={loading ? `loading loading-spinner` : ` loading-spinner`}></span>
                      Submit
                  </button>
              </div>
    </div>
    </div>
  )
}

export default ForgotPassword
