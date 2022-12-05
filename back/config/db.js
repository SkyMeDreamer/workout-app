// подключение БД
import mongoose from 'mongoose' //позволяет соединиться с БД

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL)

		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
	} catch (error) {
		console.error(`Error: ${error.message}`.red.underline.bold)
		process.exit(1)
	}
}
