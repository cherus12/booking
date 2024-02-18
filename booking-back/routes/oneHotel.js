// На сервере (Express)
import express from 'express'

const router = express.Router()

router.get('/hotels/find/:id', async (req, res) => {
	const hotelId = req.params.id
	try {
		// Логика для загрузки информации об отеле по ID
		const hotel = await Hotel.findById(hotelId)
		if (!hotel) {
			return res.status(404).json({ message: 'Hotel not found' })
		}
		res.status(200).json(hotel)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal server error' })
	}
})

export default router
