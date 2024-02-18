import express from 'express'
import {
	createHotel,
	updateHotel,
	deleteHotel,
	getOneHotel,
	getHotel,
	countByCity,
	getHotelByQuery,
	getHotelRoom,
} from '../controllers/hotel.js'

import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

// CREATE HOTEL
router.post('/', createHotel) // verifyAdmin

// UPDATE HOTEL
router.put('/find/:id', verifyAdmin, updateHotel)

// DELETE HOTEL
router.delete('/find/:id', verifyAdmin, deleteHotel)

// GET
router.get('/:id', getOneHotel)
router.get('/find/:id', getHotelByQuery)
router.get('/room/:id', getHotelRoom)

// GET ALL
router.get('/', getHotel)
router.get('/countByCity', countByCity)

export default router
