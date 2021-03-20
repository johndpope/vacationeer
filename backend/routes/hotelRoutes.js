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
	update
} = require('../controllers/hotelControllers')
const { requireUserInfo } = require('../controllers/authenticationControllers')

router.post('/add-hotel', requireUserInfo, formidable(), create)
router.get('/hotels', hotels)
router.get('/hotel/image/:id', image)
router.get('/hotels/seller', requireUserInfo, hotelsSeller)
router.delete('/delete-hotel/:hotelId', requireUserInfo, hotelOwner, remove)
router.get('/hotel/:hotelId', read)
router.put('/edit-hotel/:hotelId', requireUserInfo, hotelOwner, formidable(), update)

module.exports = router
