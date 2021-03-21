import React, { useEffect, useState } from 'react'
import { stripeSuccessRequest } from '../actions/stripeActions'
import { getCookie } from '../components/HelperFunctions'
import { LoadingOutlined } from '@ant-design/icons'

const StripeSuccessPage = ({ match, history }) => {
	const hotelId = match.params.hotelId

	useEffect(
		() => {
			stripeSuccessRequest(getCookie().token, hotelId).then((resp) => {
				if (resp.data.success) {
					history.push('/user/dashboard')
				} else {
					history.push('/stripe/cancel')
				}
			})
		},
		[ hotelId ]
	)

	return (
		<div className='container'>
			<div className='d-flex justify-content-center p-5'>
				<LoadingOutlined className='display-1 text-danger p-5' />
			</div>
		</div>
	)
}

export default StripeSuccessPage
