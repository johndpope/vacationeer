const { check } = require('express-validator')

const registerValidator = [
	check('name').not().isEmpty().withMessage('Enter a valid name'),
	check('email').isEmail().withMessage('Enter a valid email address'),
	check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]

const loginValidator = [
	check('email').isEmail().withMessage('Enter a valid email address'),
	check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]

const forgotPasswordValidator = [ check('email').not().isEmpty().isEmail().withMessage('Enter a valid email address') ]

const resetPasswordValidator = [
	check('newPassword').not().isEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]

export { registerValidator, loginValidator, forgotPasswordValidator, resetPasswordValidator }
