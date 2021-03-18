import React from 'react'
import DashboardNav from '../components/DashboardNav'
import Layout from '../components/Layout'
import StripeNav from '../components/StripeNav'
import { Link } from 'react-router-dom'

const SellerDashboardPage = () => {
	return (
		<Layout>
			<div className='container-fluid bg-secondary p-5'>
				<StripeNav />
			</div>

			<div className='container-fluid p-4'>
				<DashboardNav />
			</div>

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
		</Layout>
	)
}

export default SellerDashboardPage
