import express from 'express'
import formidable from 'express-formidable'
const router = express.Router()

const {
	create,
	hotels,
	image,
	hotelsSeller,
	remove,
	hotelOwner,
	read,
	update,
	userHotelBookings,
	isAlreadyBooked,
	searchListings,
	hotelStar,
	hotelsCount
} = require('../controllers/hotelControllers')
const { requireUserInfo } = require('../controllers/authenticationControllers')

router.post('/add-hotel', requireUserInfo, formidable(), create)
router.post('/hotels', hotels)
router.get("/hotels/total", hotelsCount);
router.get('/hotel/image/:id', image)
router.post('/hotels/seller', requireUserInfo, hotelsSeller)
router.delete('/delete-hotel/:hotelId', requireUserInfo, hotelOwner, remove)
router.get('/hotel/:hotelId', read)
router.put('/edit-hotel/:hotelId', requireUserInfo, hotelOwner, formidable(), update)
router.get('/user/hotel-bookings', requireUserInfo, userHotelBookings)
router.get('/is-already-booked/:hotelId', requireUserInfo, isAlreadyBooked)
router.post('/search-listings', searchListings)
router.put("/hotel/star/:hotelId", requireUserInfo, hotelStar)

module.exports = router
