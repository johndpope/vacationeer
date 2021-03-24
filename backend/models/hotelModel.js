import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const hotelSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: 'Title is required'
		},
		description: {
			type: String,
			required: 'Description is required',
			maxlength: 5000
		},
		location: {
			type: String
		},
		price: {
			type: Number,
			required: 'Price is required',
			trim: true
		},
		postedBy: {
			type: ObjectId,
			ref: 'User'
		},
		image: {
			data: 'Buffer',
			contentType: String
		},
		from: {
			type: Date
		},
		to: {
			type: Date
		},
		bed: {
			type: Number
		},
		ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
	},
	{ timestamps: true }
)

const Hotel = mongoose.model('Hotel', hotelSchema)

export default Hotel
