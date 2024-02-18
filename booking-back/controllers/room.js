import Rooms from '../models/Rooms.js'
import Hotels from '../models/Hotels.js'
import { createError } from '../utils/error.js'

export const createRoom = async (req, res, next) => {
	const hotelId = req.params.hotelid
	const newRoom = new Rooms(req.body)

	try {
		const savedRoom = await newRoom.save()

		// Найдем отель по id
		const hotel = await Hotels.findById(hotelId)
		if (!hotel) {
			throw createError(404, 'Hotel not found')
		}

		// Добавим идентификатор новой комнаты в массив комнат отеля
		hotel.rooms.push(savedRoom._id)
		await hotel.save()

		res.status(200).json(savedRoom)
	} catch (err) {
		next(err)
	}
}

export const updateRoom = async (req, res, next) => {
	try {
		const updateRoom = await Rooms.findByIdAndUpdate(req.params.id, {
			$set: req.body,
			$new: true,
		})

		res.status(200).json(updateRoom)
	} catch (err) {
		next(err)
	}
}

export const updateRoomAvailability = async (req, res, next) => {
	try {
		await Rooms.updateOne(
			{ 'roomNumbers._id': req.params.id },
			{
				$push: {
					'roomNumbers.$.unavailableDates': req.body.dates,
				},
			}
		)

		res.status(200).json(updateRoom)
	} catch (err) {
		next(err)
	}
}

// export const deleteRoom = async (req, res, next) => {
// 	const hotelId = req.params.hotelid
// 	try {
// 		await Rooms.findByIdAndDelete(hotelId)

// 		res.status(200).json('Room deleted')
// 	} catch (err) {
// 		next(err)
// 	}
// 	try {
// 		await Rooms.findByIdAndDelete(req.params.id)
// 		try {
// 			await Hotel.findByIdAndUpdatе(hotelId, {
// 				$pull: { rooms: req.param.id },
// 			})
// 		} catch (err) {
// 			next(err)
// 		}
// 		res.status(200).json('Room has been deleted.')
// 	} catch (err) {
// 		next(err)
// 	}
// }

export const deleteRoom = async (req, res, next) => {
	const hotelId = req.params.hotelid
	try {
		// Удаление комнаты по ее идентификатору
		await Rooms.findByIdAndDelete(req.params.id)

		// Удаление идентификатора комнаты из массива комнат отеля
		await Hotels.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })

		// Отправка ответа об успешном удалении комнаты
		res.status(200).json('Room has been deleted.')
	} catch (err) {
		// Передача ошибки на обработку в глобальный обработчик ошибок
		next(err)
	}
}

export const getOneRoom = async (req, res, next) => {
	try {
		const room = await Rooms.findById(req.params.id)

		res.status(200).json(room)
	} catch (err) {
		next(err)
	}
}

export const getRoom = async (req, res, next) => {
	try {
		const room = await Rooms.find()

		res.status(200).json(room)
	} catch (err) {
		next(err)
	}
}

export const getHotelRoom = async (req, res, next) => {
	try {
		const hotel = Hotel.findById(req.params.id)
		const list = await Promise.all(
			hotel.rooms.map(room => {
				return Rooms.findById(room)
			})
		)
		res.status(200).json(list)
	} catch (err) {
		next(err)
	}
}
