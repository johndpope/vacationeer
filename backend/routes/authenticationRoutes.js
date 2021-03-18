import express from 'express'
const router = express.Router()

const {
	register,
	accountActivation,
	login,
	forgotPassword,
	resetPassword,
	googleLogin,
	facebookLogin
} = require('../controllers/authenticationControllers')

const {
	registerValidator,
	loginValidator,
	forgotPasswordValidator,
	resetPasswordValidator
} = require('../validators/authentication')
const { executeValidation } = require('../validators')

router.post('/register', registerValidator, executeValidation, register)
router.post('/account-activation', accountActivation)
router.post('/login', loginValidator, executeValidation, login)

router.put('/forgot-password', forgotPasswordValidator, executeValidation, forgotPassword)
router.put('/reset-password', resetPasswordValidator, executeValidation, resetPassword)

router.post('/google-login', googleLogin)
router.post('/facebook-login', facebookLogin)

module.exports = router
