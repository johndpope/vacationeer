import express from 'express'

const router = express.Router()

const { requireUserInfo } = require('../controllers/authenticationControllers')

const {
	createStripeAccount,
	getAccountStatus,
	getAccountBalance,
	payoutSetting,
	stripeSessionId,
	stripeSuccess
} = require('../controllers/stripeControllers')

router.post('/create-stripe-account', requireUserInfo, createStripeAccount)
router.post('/get-account-status', requireUserInfo, getAccountStatus)
router.post('/get-account-balance', requireUserInfo, getAccountBalance)
router.post('/payout-setting', requireUserInfo, payoutSetting)
router.post('/stripe-session-id', requireUserInfo, stripeSessionId)
router.post('/stripe-success', requireUserInfo, stripeSuccess)

module.exports = router
