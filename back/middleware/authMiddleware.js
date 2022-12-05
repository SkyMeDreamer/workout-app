import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'

//защита от случайных посетителей
export const protect = asyncHandler(async (req, res, next) => {
	let token
	// если токе есть, берем все после Bearer
	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]
		// декодируем с помощью метода verify и нашим ACCESS_TOKEN
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
		// ищем пользователя по Id убираем пароль
		const userFound = await User.findById(decoded.userId).select('-password')
		// если находим пользователя идем дальше или 401
		if (userFound) {
			req.user = userFound
			next()
		} else {
			res.status(401)
			throw new Error('Не авторизован, токе не работает')
		}
	}
	// если токена нет, то 401
	if (!token) {
		res.status(401)
		throw new Error('Не авторизован, без токена')
	}
})
