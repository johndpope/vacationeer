const express = require('express')
const router = express.Router()

const { read, update } = require('../controllers/userControllers')
const { requireUserInfo, adminMiddleware } = require('../controllers/authenticationControllers')

router.get('/user/:id', requireUserInfo, read)
router.put('/user/update', requireUserInfo, update)
router.put('/admin/update', requireUserInfo, adminMiddleware, update)

module.exports = router
