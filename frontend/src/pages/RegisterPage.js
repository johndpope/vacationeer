import React, { useState } from 'react'
import { isAuthenticated } from '../components/HelperFunctions'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'

const initialState = {
	name: 'Markus',
	email: 'markusmatu96@gmail.com',
	password: '123456',
	confirmPassword: '123456',
	buttonText: 'Submit'
}

const RegisterPage = () => {
	const [ userInfo, setUserInfo ] = useState(initialState)

	const { name, email, password, confirmPassword, buttonText } = userInfo

	const handleChange = (name) => (e) => {
		setUserInfo({ ...userInfo, [name]: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!email || !password) {
			toast.error('Email and password is required')
			return
		}

		if (password !== confirmPassword) {
			toast.error('Passwords do not match')
			return
		}

		if (password.length > 6) {
			toast.error('Password must be at least 6 characters long')
			return
		}

		setUserInfo({ ...userInfo, buttonText: 'Submitting' })
		axios({
			method: 'POST',
			url: `${process.env.REACT_APP_API}/register`,
			data: { name, email, password }
		})
			.then((resp) => {
				console.log('Sign up successful!', resp)
				setUserInfo({ ...userInfo, name: '', email: '', password: '', confirmPassword: '', buttonText: 'Submitted' })
				toast.success(resp.data.message)
			})
			.catch((err) => {
				console.log('Sign up error', err.response.data)
				setUserInfo({ ...userInfo, buttonText: 'Submit' })
				toast.error(err.response.data.error)
			})
	}

	const registerForm = (e) => (
		<form>
			<div className='form-group'>
				<label className='text-muted'>Name</label>
				<input
					onChange={handleChange('name')}
					value={name}
					type='text'
					className='form-control'
					placeholder='Enter Name'
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Email</label>
				<input
					onChange={handleChange('email')}
					value={email}
					type='email'
					className='form-control'
					placeholder='Enter Email'
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Password</label>
				<input
					onChange={handleChange('password')}
					value={password}
					type='password'
					className='form-control'
					placeholder='Enter Password'
				/>
			</div>

			<div className='form-group mb-4'>
				<label className='text-muted'>Confirm Password</label>
				<input
					onChange={handleChange('confirmPassword')}
					value={confirmPassword}
					type='password'
					className='form-control'
					placeholder='Confirm Password'
				/>
			</div>

			<div>
				<button disabled={!email || !password || !name} onClick={handleSubmit} className='btn btn-primary btn-raised'>
					{buttonText}
				</button>
			</div>
		</form>
	)

	return (
		<Layout>
			<div className='container-fluid bg-secondary p-5 text-center'>
				<h1>Register</h1>
			</div>
			<div className='container'>
				<div className='row' />
				<div className='col-md-6 offset-md-3'>
					{isAuthenticated() ? <Redirect to='/' /> : null}
					{registerForm()}
					<br />
					<Link to='/authentication/forgot-password' className='btn btn-sm btn-outline-danger'>
						Forgot Password?
					</Link>
				</div>
			</div>
		</Layout>
	)
}

export default RegisterPage
