import User from '../models/userModel'
import Stripe from 'stripe'
import queryString from 'query-string'

const stripe = Stripe(process.env.STRIPE_SECRET)

export const createStripeAccount = async (req, res) => {
	const user = await User.findById(req.user._id).exec()

	if (!user.stripe_account_id) {
		const account = await stripe.accounts.create({
			type: 'express'
		})

		user.stripe_account_id = account.id
		user.save()
	}

	let accountLink = await stripe.accountLinks.create({
		account: user.stripe_account_id,
		refresh_url: process.env.STRIPE_REDIRECT_URL,
		return_url: process.env.STRIPE_REDIRECT_URL,
		type: 'account_onboarding'
	})

	accountLink = Object.assign(accountLink, {
		'stripe_user[email]': user.email || undefined
	})

	res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`)
}

//change the interval of receiving payments
// const updatePaymentDelay = async (accountId) => {
// 	const account = await stripe.account.update(accountId, {
// 		settings: {
// 			payouts: {
// 				schedule: {
// 					delay_days: 2
// 				}
// 			}
// 		}
// 	})

// 	return account
// }

export const getAccountStatus = async (req, res) => {
	const user = await User.findById(req.user._id).exec()

	const account = await stripe.accounts.retrieve(user.stripe_account_id)

	const updatedUser = await User.findByIdAndUpdate(
		user._id,
		{
			stripe_seller: account
		},
		{ new: true }
	)
		.select('-password')
		.exec()

	console.log(updatedUser)
	res.json(updatedUser)
}

export const getAccountBalance = async (req, res) => {
	const user = await User.findById(req.user._id).exec()

	try {
		const balance = await stripe.balance.retrieve({
			stripeAccount: user.stripe_account_id
		})

		res.json(balance)
	} catch (error) {
		console.log(error)
	}
}

export const payoutSetting = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).exec()

		const loginLink = await stripe.accounts.createLoginLink(user.stripe_seller.id, {
			redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL
		})
		res.json(loginLink)
	} catch (error) {
		console.log(error)
	}
}
