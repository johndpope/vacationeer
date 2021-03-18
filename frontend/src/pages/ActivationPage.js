import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'

const initialState = {
	name: '',
	token: '',
	visibility: true
}

const ActivationPage = ({ match, history }) => {
	const [ userInfo, setUserInfo ] = useState(initialState)

	const { name, token, visibility } = userInfo

	useEffect(() => {
		const token = match.params.token
		const { name } = jwt.decode(token)

		if (token) {
			setUserInfo({ ...userInfo, name, token })
		}
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		axios({
			method: 'POST',
			url: `${process.env.REACT_APP_API}/account-activation`,
			data: { token }
		})
			.then((resp) => {
				setUserInfo({ ...userInfo, visibility: false })
				toast.success(resp.data.message)
				setTimeout(() => {
					history.push('/login')
				}, 2000)
			})
			.catch((err) => {
				console.log('Account activation error', err.response.data.error)
				toast.error(err.response.data.error)
			})
	}

	const activationLink = () => (
		<div className='text-center'>
			<h1 className='p-5'>Hey {name}, Ready to activate your account?</h1>
			<button className='btn btn-outline-primary' onClick={handleSubmit}>
				Activate Account
			</button>
		</div>
	)

	return (
		<Layout>
			<div className='col-md-6 offset-md-3'>
				<h1 className='p-5 text-center'>Activate Account</h1>
				{activationLink()}
			</div>
		</Layout>
	)
}

export default ActivationPage
