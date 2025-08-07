import express from 'express'
import { authContoller } from '../Controllers/auth.controller.js'
import { AuthRegisterValidation, AuthLoginValidation } from '../Middleware/auth.Middleware.js'
import {ProtectedRoute} from '../Middleware/protectedRoute.js'

const router = express.Router()

//auth
router.post('/register', AuthRegisterValidation, authContoller.register)
router.post('/login', AuthLoginValidation, authContoller.login)
router.post('/logout', authContoller.logout)
// onbording (which means After use register sucessfully they have to complete the profile after that)
router.post('/onbroad', ProtectedRoute, authContoller.onbroad)


export default router