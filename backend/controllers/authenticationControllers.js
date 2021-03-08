const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// const signup = (req, res) => {
// 	console.log('Req body on signup', req.body)
// 	const { name, email, password } = req.body

// 	User.findOne({ email }).exec((err, user) => {
// 		if (user) {
// 			return res.status(400).json({
// 				error: 'Email is already taken'
// 			})
// 		}
// 	})

// 	const newUser = new User({ name, email, password })

// 	newUser.save((error, success) => {
// 		if (error) {
// 			console.log('signup error', err)
// 			return res.status(400).json({
// 				error
// 			})
// 		}
// 		res.json({
// 			message: 'Sign up successful!'
// 		})
// 	})
// }

const signup = (req, res) => {
	const { name, email, password } = req.body

	User.findOne({ email }).exec((err, user) => {
		if (user) {
			return res.status(400).json({
				error: 'Email is already taken'
			})
		}

		const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' })

		const emailInfo = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: `Account activation link`,
			html: `
				<h1>Please use the following link to activate your account</h1>
				<p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
				<hr/>
				<p>This email may contain sensitive information</p>
				<p>${process.env.CLIENT_URL}</p>
			`
		}

		sgMail
			.send(emailInfo)
			.then((s) => {
				// console.log("sign up email sent", s)
				return res.json({
					message: `Email has been sent to ${email}. Follow the instructions to activate your account.`
				})
			})
			.catch((error) => {
				// console.log("sign up email sent error", error)
				return res.json({
					message: error.message
				})
			})
	})
}

const accountActivation = (req, res) => {
	const { token } = req.body

	if (token) {
		jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(error, decoded) {
			if (error) {
				console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', error)
				return res.status(401).json({
					error: 'Expired link. Sign up again.'
				})
			}

			const { name, email, password } = jwt.decode(token)

			const user = new User({ name, email, password })

			user.save((error, user) => {
				if (error) {
					console.log('save user in account activtion error', error)
					return res.status(401).json({
						error: 'Error saving user in database. Try to sign up again.'
					})
				}
				return res.json({
					message: 'Sign up successful!'
				})
			})
		})
	} else {
		return res.json({
			message: 'Something went wrong. Try again.'
		})
	}
}

const signin = (req, res) => {
	const { email, password } = req.body

	User.findOne({ email }).exec((error, user) => {
		if (error || !user) {
			return res.status(400).json({
				error: 'User with that email does not exist. Please sign up.'
			})
		}

		if (!user.authenticate(password)) {
			return res.status(400).json({
				error: 'Email or password do not match'
			})
		}

		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
		const { _id, name, email, role } = user

		return res.json({
			token,
			user: { _id, name, email, role }
		})
	})
}

module.exports = { signup, accountActivation, signin }
