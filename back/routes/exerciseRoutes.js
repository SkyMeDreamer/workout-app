import express from 'express'
import { createNewExerciseLog } from '../controllers/exercise/logController.js'
import { createNewExercise } from '../controllers/exercise/mainController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createNewExercise)
router.route('/log').post(protect, createNewExerciseLog)

export default router
