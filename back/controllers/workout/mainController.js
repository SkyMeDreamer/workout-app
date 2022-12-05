import asyncHandler from 'express-async-handler'
import Workout from '../../models/workoutModel.js'

//@desc    Add new workout
//@route   POST /api/workout
//@access  Private
export const createNewWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const workout = await Workout.create({
		name,
		exercises: exerciseIds
	})

	res.json(workout)
})

//@desc    Get new workout
//@route   GET /api/workouts/:id
//@access  Private
export const getWorkout = asyncHandler(async (req, res) => {
	const workout = await Workout.findById(req.params.id)
		.populate('exercises')
		.lean()

	const minutes = Math.ceil(workout.exercises.length * 3.7)

	res.json({ ...workout, minutes })
})
