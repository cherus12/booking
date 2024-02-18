import Hotel from '../models/Hotels.js'
import Rooms from '../models/Rooms.js'

export const createHotel = async (req, res, next) => {
	try {
		// Создание нового отеля с данными из запроса
		const newHotel = new Hotel(req.body)

		// Сохранение нового отеля в базе данных MongoDB
		const savedHotel = await newHotel.save()

		// Отправка сохраненного отеля в ответ на запрос
		res.status(200).json(savedHotel)
	} catch (err) {
		// Обработка ошибки при сохранении
		res.status(500).json(err)
	}
}

export const updateHotel = async (req, res, next) => {
	try {
		const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {
			$set: req.body,
			$new: true,
		})

		res.status(200).json(updateHotel)
	} catch (err) {
		next(err)
	}
}

export const deleteHotel = async (req, res, next) => {
	try {
		await Hotel.findByIdAndDelete(req.params.id)

		res.status(200).json('Hotel deleted')
	} catch (err) {
		next(err)
	}
}

export const getOneHotel = async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.id)

		res.status(200).json(hotel)
	} catch (err) {
		next(err)
	}
}

export const getHotel = async (req, res, next) => {
	const { min, max, ...others } = req.query
	try {
		const hotel = await Hotel.find({
			...others,
			cheapestPrice: { $gt: min || 1, $lt: max || 10000 },
		})

		res.status(200).json(hotel)
	} catch (err) {
		next(err)
	}
}
export const countByCity = async (req, res, next) => {
	const cities = req.query.cities.split(',')
	try {
		const list = await Promise.all(
			cities.map(city => {
				return Hotel.countDocuments({ city: city })
			})
		)

		res.status(200).json(list)
	} catch (err) {
		next(err)
	}
}

export const getHotelByQuery = async (req, res, next) => {
	const { city, min, max, ...others } = req.query
	try {
		const hotels = await Hotel.find({
			...others,
			city: city || { $exists: true },
			cheapestPrice: { $gt: min || 1, $lt: max || 999 },
		})
		res.status(200).json(hotels)
	} catch (err) {
		next(err)
	}
}

export const getHotelRoom = async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.id)
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
