import express from 'express'
import morgan from 'morgan' //отображение запросов на сервер в терминале
import dotenv from 'dotenv' //позволяет загрузить переменные из .env
import colors from 'colors' //подсвечивает терминал

/* Config */
import { connectDB } from './config/db.js'

//Middleware
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

/* Routes */
import userRoutes from './routes/userRoutes.js'
import exerciseRoutes from './routes/exerciseRoutes.js'
import workoutRoutes from './routes/workoutRoutes.js'

//запускаем dotenv
dotenv.config()

//коннектимся к БД
connectDB()

//запускаем express
const app = express()

//если мы в режиме разработки - запускаем morgan
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

//ответ в формате json
app.use(express.json())

//подключаем путь user
app.use('/api/users', userRoutes)
//путь к упражнению
app.use('/api/exercises', exerciseRoutes)
//все упражнения
app.use('/api/workouts', workoutRoutes)

//Функции промежуточной обработки (middleware)
//вызываем обработчик ошибок
app.use(notFound)
app.use(errorHandler)

//подключаем сервер по пути в .env или 5000
const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
