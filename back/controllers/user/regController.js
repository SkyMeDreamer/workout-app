//контроллер регистрации пользователя
import User from '../../models/userModel.js'
//обработчик ошибок
import asyncHandler from 'express-async-handler'
import { generateToken } from '../../helpers/generateToken.js'
//@desc    Register user
//@route   POST /api/users
//@access  Public
//регистрируем нового пользователя
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	//ищем пользователя по email
	const isUserExist = await User.findOne({ email })

	//если такой пользователь есть, выдаем ошибку
	if (isUserExist) {
		res.status(400)
		//меняем текст ошибки
		throw new Error('Данный пользователь уже зарегистрирован')
	}

	//создаем пользователя
	const user = await User.create({ email, password })

	//создаем токен
	const token = generateToken(user._id)

	//отдаем зарегистрированного пользователя
	res.json({ user, token })
})
