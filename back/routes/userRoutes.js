//путь получения данных - профиль пользователя
import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getUserProfile } from '../controllers/user/profileController.js'
import { authUser } from '../controllers/user/authController.js'
import { registerUser } from '../controllers/user/regController.js'

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile)

export default router
