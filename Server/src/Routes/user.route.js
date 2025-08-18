import express from 'express'
import { ProtectedRoute } from '../Middleware/protectedRoute.js'
import { userController } from '../Controllers/user.controller.js'

const router = express.Router()

router.use(ProtectedRoute)

router.get('/', userController.getRecommended)
router.get('/getFriends', userController.getFriends)


export default router