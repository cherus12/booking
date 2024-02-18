import express from 'express'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()

const url = process.env.MONGO

const connect = async () => {
	try {
		await mongoose.connect(url)
		console.log('Connected to MongoDB')
	} catch (err) {
		throw err
	}
}

mongoose.connection.on('connected', () => {
	console.log('Mongo connected')
})
mongoose.connection.on('disconnected', () => {
	console.log('Mongo disconnected')
})

connect()

// MIDDLE
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'] }))
app.use(cookieParser())
app.use(express.json())
app.use((err, req, res, next) => {
	const errorStatus = err.status || 500
	const errorMessage = err.message || 'Something went wrong'
	return res.status(errorStatus).json({
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	})
})

app.use('/auth', authRoute)
app.use('/hotels', hotelsRoute)
app.use('/rooms', roomsRoute)
app.use('/users', usersRoute)

app.listen(process.env.PORT, () => {
	console.log('Connect to web')
})
