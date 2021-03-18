import axios from 'axios'

export const createStripeAccount = async (token) =>
	await axios.post(
		`${process.env.REACT_APP_API}/create-stripe-account`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	)
