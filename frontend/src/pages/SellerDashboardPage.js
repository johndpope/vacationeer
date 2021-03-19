import React, { useState } from 'react'
import DashboardNav from '../components/DashboardNav'
import Layout from '../components/Layout'
import StripeNav from '../components/StripeNav'
import { Link } from 'react-router-dom'
import { isAuthenticated, getCookie } from '../components/HelperFunctions'
import { HomeOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import { createStripeAccount } from '../actions/stripeActions'

const SellerDashboardPage = () => {
	const [ loading, setLoading ] = useState(false)

	const handleClick = async () => {
		setLoading(true)
		try {
			let response = await createStripeAccount(getCookie().token)
			window.location.href = response.data
		} catch (error) {
			console.log(error)
			toast.error('Creating Stripe account failed, try again.')
			setLoading(false)
		}
	}

	const stripeLinked = () => (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-10'>
					<h2>Your Hotels</h2>
				</div>

				<div className='col-md-2'>
					<Link to='/hotels/new' className='btn btn-primary'>
						+ Add New
					</Link>
				</div>
			</div>
		</div>
	)

	const stripeUnLinked = () => (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-6 offset-md-3 text-center'>
					<div className='p-5 pointer'>
						<HomeOutlined className='h1' />
						<h4>Setup payouts to list hotel rooms</h4>
						<p className='lead'>Mern partners with stripe to transfer earnings to your bank account</p>
						<button disabled={loading} onClick={handleClick} className='btn btn-primary mb-3'>
							{loading ? 'Processing...' : 'Setup Payouts'}
						</button>
						<p className='text-muted'>
							<small>You'll be redirected to Stripe to complete the onboarding process.</small>
						</p>
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Layout>
			<div className='container-fluid bg-secondary p-5'>
				<StripeNav />
			</div>

			<div className='container-fluid p-4'>
				<DashboardNav />
			</div>

			{isAuthenticated() && isAuthenticated().stripe_seller && isAuthenticated().stripe_seller.charges_enabled ? (
				stripeLinked()
			) : (
				stripeUnLinked()
			)}
		</Layout>
	)
}

export default SellerDashboardPage
