import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { authenticate, isAuthenticated } from '../components/HelperFunctions'
import { toast } from 'react-toastify'
import Google from '../components/GoogleLogin'
import Facebook from '../components/FacebookLogin'
import Layout from '../components/Layout'

const initialState = {
  email: 'markusmatu96@gmail.com',
  password: '123456',
  buttonText: 'Submit',
}

const LoginPage = ({ history }) => {
  const [userInfo, setUserInfo] = useState(initialState)
  const { email, password, buttonText } = userInfo

  const handleChange = (name) => (e) => {
    setUserInfo({ ...userInfo, [name]: e.target.value })
  }

  const informParent = (resp) => {
    authenticate(resp, () => {
      const intended = history.location.state
      if (intended) {
        history.push(intended.from)
      } else {
        isAuthenticated() && isAuthenticated().role === 'admin'
          ? history.push('/admin')
          : history.push('/user/dashboard')
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserInfo({ ...userInfo, buttonText: 'Submitting' })
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/login`,
      data: { email, password },
    })
      .then((resp) => {
        authenticate(resp, () => {
          const intended = history.location.state
          if (intended) {
            history.push(intended.from)
          } else {
            setUserInfo({
              ...userInfo,
              name: '',
              email: '',
              password: '',
              buttonText: 'Submitted',
            })
            isAuthenticated() &&
              isAuthenticated().role === 'admin' &&
              history.push('/user/dashboard')
          }
        })
      })
      .catch((err) => {
        console.log('Sign in error', err.response.data)
        setUserInfo({ ...userInfo, buttonText: 'Submit' })
        toast.error(err.response.data.error)
      })
  }

  const loginForm = (e) => (
    <form className='mt-5'>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange('email')}
          value={email}
          type='email'
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={handleChange('password')}
          value={password}
          type='password'
          className='form-control'
        />
      </div>

      <div>
        <button
          disabled={!email || !password}
          onClick={handleSubmit}
          className='btn btn-primary btn-raised mr-3'
        >
          {buttonText}
        </button>
        <Link
          to='/authentication/forgot-password'
          className='btn btn-sm btn-outline-danger'
        >
          Forgot Password?
        </Link>
      </div>

      <Link to='/register' className='btn btn-sm btn-outline-primary mt-3'>
        New customer? Register
      </Link>
    </form>
  )

  return (
    <Layout>
      <div className='container-fluid pt-5 text-center'>
        <h1>Sign In</h1>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 auth-form p-3'>
            {isAuthenticated() ? <Redirect to='/' /> : null}
            {loginForm()}
            <br />
            <Google informParent={informParent} />
            <Facebook informParent={informParent} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LoginPage
