const express = require('express')
const router = express.Router()

const { signup, accountActivation, signin } = require('../controllers/authenticationControllers')

const { signupValidator, signInValidator } = require('../validators/authentication')
const { executeValidation } = require('../validators')

router.post('/signup', signupValidator, executeValidation, signup)
router.post('/account-activation', accountActivation)
router.post('/signin', signInValidator, executeValidation, signin)

module.exports = router
