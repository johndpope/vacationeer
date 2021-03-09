import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { authenticate, isAuthenticated } from '../components/HelperFunctions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import BluePrint from '../components/BluePrint'

const initialState = {
	email: 'markusmatu96@gmail.com',
	password: '123456',
	buttonText: 'Submit'
}

const SignInPage = ({ history }) => {
	const [ userInfo, setUserInfo ] = useState(initialState)
	const { email, password, buttonText } = userInfo

	const handleChange = (name) => (e) => {
		setUserInfo({ ...userInfo, [name]: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setUserInfo({ ...userInfo, buttonText: 'Submitting' })
		axios({
			method: 'POST',
			url: `${process.env.REACT_APP_API}/signin`,
			data: { email, password }
		})
			.then((resp) => {
				console.log('Sign in successful!', resp)

				authenticate(resp, () => {
					setUserInfo({ ...userInfo, name: '', email: '', password: '', buttonText: 'Submitted' })
					isAuthenticated() && isAuthenticated().role === 'admin' ? history.push('/admin') : history.push('/private')
				})
			})
			.catch((err) => {
				console.log('Sign in error', err.response.data)
				setUserInfo({ ...userInfo, buttonText: 'Submit' })
				toast.error(err.response.data.error)
			})
	}

	const signInForm = (e) => (
		<form>
			<div className='form-group'>
				<label className='text-muted'>Email</label>
				<input onChange={handleChange('email')} value={email} type='email' className='form-control' />
			</div>

			<div className='form-group'>
				<label className='text-muted'>Password</label>
				<input onChange={handleChange('password')} value={password} type='password' className='form-control' />
			</div>

			<div>
				<button onClick={handleSubmit} className='btn btn-primary btn-raised'>
					{buttonText}
				</button>
			</div>
		</form>
	)

	return (
		<BluePrint>
			<div className='col-md-6 offset-md-3'>
				<ToastContainer />
				{isAuthenticated() ? <Redirect to='/' /> : null}
				<h1 className='p-5 text-center'>Sign In</h1>
				{signInForm()}
			</div>
		</BluePrint>
	)
}

export default SignInPage
