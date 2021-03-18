import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			max: 32
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true
		},
		hashed_password: {
			type: String,
			required: true
		},
		salt: String,
		role: {
			type: String,
			default: 'customer'
		},
		resetPasswordLink: {
			data: String,
			default: ''
		},
		stripe_account_id: '',
		stripe_seller: {},
		stripeSession: {}
	},
	{ timestamps: true }
)

userSchema
	.virtual('password')
	.set(function(password) {
		this._password = password
		this.salt = this.createSalt()
		this.hashed_password = this.encryptPassword(password)
	})
	.get(function() {
		return this._password
	})

userSchema.methods = {
	authenticate: function(plainPassword) {
		return this.encryptPassword(plainPassword) === this.hashed_password
	},

	encryptPassword: function(password) {
		if (!password) return ''
		try {
			return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
		} catch (err) {
			return ''
		}
	},

	createSalt: function() {
		return Math.round(new Date().valueOf() * Math.random()) + ''
	}
}

const User = mongoose.model('User', userSchema)

export default User
