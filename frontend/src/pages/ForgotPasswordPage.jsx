import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'

const initialState = {
  email: '',
  buttonText: 'Request password reset link',
}

const ForgotPasswordPage = ({ history }) => {
  const [userInfo, setUserInfo] = useState(initialState)
  const { email, buttonText } = userInfo

  const handleChange = (name) => (e) => {
    setUserInfo({ ...userInfo, [name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserInfo({ ...userInfo, buttonText: 'Submitting' })
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: { email },
    })
      .then((resp) => {
        console.log('Forgot password successful!', resp)
        toast.success(resp.data.message)
        setUserInfo({ ...userInfo, buttonText: 'Requested' })
      })
      .catch((err) => {
        console.log('forgot password error', err.response.data)
        toast.error(err.response.data.error)
        setUserInfo({ ...userInfo, buttonText: 'Request password reset link' })
      })
  }

  const forgotPasswordForm = (e) => (
    <form onSubmit={handleSubmit}>
      <div className='form-group pt-3'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange('email')}
          value={email}
          type='email'
          className='form-control'
        />
      </div>

      <div>
        <button
          disabled={
            buttonText === 'Requested' || buttonText === 'Submitting' || !email
          }
          type='submit'
          className='btn btn-primary btn-raised mb-3'
        >
          {buttonText}
        </button>
      </div>
    </form>
  )

  return (
    <Layout>
      <h1 className='p-5 text-center'>Forgot Password</h1>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 auth-form p-3'>
            {forgotPasswordForm()}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ForgotPasswordPage
