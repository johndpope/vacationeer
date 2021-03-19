import { useEffect, useState } from 'react'
import { Card, Avatar, Badge } from 'antd'
import moment from 'moment'
import { isAuthenticated, getCookie } from '../components/HelperFunctions'

import { currencyFormatter, getAccountBalance, payoutSetting } from '../actions/stripeActions'
import { SettingOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'

const { Meta } = Card
const { Ribbon } = Badge

const StripeNav = () => {
	const [ balance, setBalance ] = useState(0)
	const [ loading, setLoading ] = useState(false)

	useEffect(() => {
		getAccountBalance(getCookie().token).then((resp) => {
			setBalance(resp.data)
		})
	}, [])

	const handleClick = async () => {
		setLoading(true)

		try {
			const resp = await payoutSetting(getCookie().token)
			console.log(resp)
			window.location.href = resp.data.url
			setLoading(false)
		} catch (error) {
			console.log(error)
			setLoading(false)
			toast.error('Unable to access settings. Try again.')
		}
	}
	return (
		<div className='d-flex justify-content-around'>
			<Card>
				<Meta
					avatar={<Avatar>{isAuthenticated().name[0]}</Avatar>}
					title={isAuthenticated().name}
					description={`Joined ${moment(isAuthenticated().createdAt).fromNow()}`}
				/>
			</Card>

			{isAuthenticated() &&
			isAuthenticated().stripe_seller &&
			isAuthenticated().stripe_seller.charges_enabled && (
				<>
					<Ribbon text='Available' color='grey'>
						<Card className='bg-light pt-1'>
							{balance &&
								balance.pending &&
								balance.pending.map((b, i) => (
									<span className='lead' key={i}>
										{currencyFormatter(b)}
									</span>
								))}
						</Card>
					</Ribbon>
					<Ribbon text='Payouts' color='silver'>
						<Card onClick={handleClick} className='bg-light pointer'>
							<SettingOutlined className='h5 pt-2' />
						</Card>
					</Ribbon>
				</>
			)}
		</div>
	)
}

export default StripeNav
