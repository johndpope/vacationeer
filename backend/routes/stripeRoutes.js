import express from 'express'
const router = express.Router()

const { requireUserInfo } = require('../controllers/authenticationControllers')

const { createStripeAccount } = require('../controllers/stripeControllers')

router.post('/create-stripe-account', requireUserInfo, createStripeAccount)

module.exports = router
