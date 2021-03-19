import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { isAuthenticated, updateUserInfo, getCookie } from '../components/HelperFunctions'
import { getAccountStatus } from '../actions/stripeActions'

const StripeCallbackPage = ({ history }) => {
	const dispatch = useDispatch()

	useEffect(
		() => {
			if (isAuthenticated() && getCookie().token) accountStatus()
		},
		[ isAuthenticated() ]
	)

	const accountStatus = async () => {
		try {
			const resp = await getAccountStatus(getCookie().token)
			console.log(resp.data)
			updateUserInfo(resp, () => {
				window.location.href = '/user/dashboard/seller'
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='d-flex justify-content-center p-5'>
			<LoadingOutlined className='display-1 p-5 text-danger' />
		</div>
	)
}

export default StripeCallbackPage
