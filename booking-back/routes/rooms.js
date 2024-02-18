import express from 'express'
import {
	getRoom,
	getOneRoom,
	updateRoom,
	deleteRoom,
	createRoom,
	getHotelRoom,
	updateRoomAvailability,
} from '../controllers/room.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

// CREATE HOTEL
router.post('/:hotelid', createRoom) // verifyAdmin

// UPDATE HOTEL
router.put('/:id', verifyAdmin, updateRoom)
router.put('/availability/:id', updateRoomAvailability)

// DELETE HOTEL
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom)

// GET
router.get('/:id', getOneRoom)
// router.get('/room/:id', getHotelRoom)

// GET ALL
router.get('/', getRoom)

export default router
