import Hotel from '../models/hotelModel'
import fs from 'fs'

export const create = async (req, res) => {
	try {
		const fields = req.fields
		const files = req.files

		const hotel = new Hotel(fields)
		hotel.postedBy = req.user._id

		if (files.image) {
			hotel.image.data = fs.readFileSync(files.image.path)
			hotel.image.contentType = files.image.type
		}

		hotel.save((error, result) => {
			if (error) {
				console.log('saving hotel error ===>', error)
				res.status(400).send('Error saving')
			}

			res.json(result)
		})
	} catch (error) {
		console.log(error)
		res.status(400).json({
			error: error.message
		})
	}
}

export const hotels = async (req, res) => {
	const allHotels = await Hotel.find({}).limit(24).select('-image.data').populate('postedBy', '_id name').exec()
	res.json(allHotels)
}

export const image = async (req, res) => {
	const hotel = await Hotel.findById(req.params.id).exec()
	if (hotel && hotel.image && hotel.image.data !== null) {
		res.set('Content-Type', hotel.image.contentType)
		return res.send(hotel.image.data)
	}
}

export const hotelsSeller = async (req, res) => {
	const allHotels = await Hotel.find({ postedBy: req.user._id })
		.select('-image.data')
		.populate('postedBy', '_id name')
		.exec()

	res.send(allHotels)
}

export const hotelOwner = async (req, res, callback) => {
	const hotel = await Hotel.findById(req.params.hotelId).exec()
	const owner = hotel.postedBy._id.toString() === req.user._id.toString()

	if (!owner) {
		return res.status(403).send('Unauthorized')
	}

	callback()
}

export const remove = async (req, res) => {
	const deleted = await Hotel.findByIdAndDelete(req.params.hotelId).select('-image.data').exec()

	res.json(deleted)
}

export const read = async (req, res) => {
	const hotel = await Hotel.findById(req.params.hotelId).select('-image.data').exec()

	res.json(hotel)
}

export const update = async (req, res) => {
	try {
		const fields = req.fields
		const files = req.files

		let data = { ...fields }

		if (files.image) {
			let image = {}
			image.data = fs.readFileSync(files.image.path)
			image.contentType = files.image.type

			data.image = image
		}

		const updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
			new: true
		}).select('-image.data')

		res.json(updated)
		
	} catch (error) {
		console.log(error)
		res.status(400).send('Hotel update failed. Try again.')
	}
}
