import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const orderSchema = new mongoose.Schema(
	{
		hotel: {
			type: ObjectId,
			ref: 'Hotel'
		},
		session: {},
		orderedBy: { type: ObjectId, ref: 'User' }

		
	},
	{ timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
