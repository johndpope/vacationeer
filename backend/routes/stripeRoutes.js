import express from 'express'

const router = express.Router()

const { requireUserInfo } = require('../controllers/authenticationControllers')

const {
	createStripeAccount,
	getAccountStatus,
	getAccountBalance,
	payoutSetting
} = require('../controllers/stripeControllers')

router.post('/create-stripe-account', requireUserInfo, createStripeAccount)
router.post('/get-account-status', requireUserInfo, getAccountStatus)
router.post('/get-account-balance', requireUserInfo, getAccountBalance)
router.post('/payout-setting', requireUserInfo, payoutSetting)

module.exports = router
