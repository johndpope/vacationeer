import React from 'react'
import Layout from '../components/Layout'

const HomePage = () => {
	return (
		<Layout>
			<div className='col-md-6 offset-md-3 text-center'>
				<h1 className='p-5'>Authentication Boilerplate</h1>
				<h2>Mern Stacked</h2>
				<hr />
				<p className='lead'>
					<strong>AUTHENTICATION:</strong> Authentication is the process of identifying users that request access to a
					system, network, or device. Access control often determines user identity according to credentials like
					username and password. Other authentication technologies like biometrics and authentication apps are also used
					to authenticate user identity.
				</p>
			</div>
		</Layout>
	)
}

export default HomePage
