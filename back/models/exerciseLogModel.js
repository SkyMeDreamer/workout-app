import mongoose from 'mongoose'
//OnjectId от Exercise
const { ObjectId } = mongoose.Schema

const exerciseLogSchema = mongoose.Schema(
	{
		user: {
			type: ObjectId,
			ref: 'User',
			required: true
		},
		exercise: {
			type: ObjectId,
			ref: 'Exercise',
			required: true
		},
		workout: {
			type: ObjectId,
			ref: 'Workout',
			required: true
		},
		completed: {
			type: Boolean,
			default: false
		},
		times: {
			weight: { type: Number, required: true },
			repeat: { type: Number, required: true },
			completed: { type: Boolean, default: false }
		}
	},
	{
		minimize: false,
		timestamps: true
	}
)

const ExerciseLog = mongoose.model('ExerciseLog', exerciseLogSchema)

export default ExerciseLog
