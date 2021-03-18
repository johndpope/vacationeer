import { Card, Avatar } from 'antd'
import moment from 'moment'
import { isAuthenticated } from '../components/HelperFunctions'

const { Meta } = Card

const StripeNav = () => {
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
				<div>
					<div>Pending Balance</div>
					<div>Payout settings</div>
				</div>
			)}
		</div>
	)
}

export default StripeNav
