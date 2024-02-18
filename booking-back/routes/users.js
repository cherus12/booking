import express from 'express'
import {
	updateUser,
	deleteUser,
	getOneUser,
	getUser,
} from '../controllers/user.js'
import { verifyToken, verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

// router.get('/authenticate', verifyToken, (req, res, next) => {
// 	res.send('You are authenticate')
// })

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
// 	res.send('hello user, you are logged in and you can delete you account')
// })

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
// 	res.send('Hello admin')
// })
// UPDATE User
router.put('/:id', verifyUser, updateUser)

// DELETE User
router.delete('/:id', deleteUser) // verifyUser

// GET
router.get('/:id', verifyUser, getOneUser)

// GET ALL
router.get('/', getUser) // verifyAdmin

export default router
