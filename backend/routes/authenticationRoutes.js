const express = require('express')
const router = express.Router()

const {
	signup,
	accountActivation,
	signin,
	forgotPassword,
	resetPassword,
	googleLogin,
	facebookLogin
} = require('../controllers/authenticationControllers')

const {
	signupValidator,
	signInValidator,
	forgotPasswordValidator,
	resetPasswordValidator
} = require('../validators/authentication')
const { executeValidation } = require('../validators')

router.post('/signup', signupValidator, executeValidation, signup)
router.post('/account-activation', accountActivation)
router.post('/signin', signInValidator, executeValidation, signin)

router.put('/forgot-password', forgotPasswordValidator, executeValidation, forgotPassword)
router.put('/reset-password', resetPasswordValidator, executeValidation, resetPassword)

router.post('/google-login', googleLogin)
router.post('/facebook-login', facebookLogin)

module.exports = router
