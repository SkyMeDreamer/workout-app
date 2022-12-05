import User from '../../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../../helpers/generateToken.js'

//@desc    Auth user
//@route   POST /api/users/login
//@access  Public
// проверяем авторизацию пользователя
export const authUser = asyncHandler(async (req, res) => {
	// ищем по почте и паролю
	const { email, password } = req.body

	const user = await User.findOne({ email })
	// если почта и пароль совпадают, генерируем токен и возвращаем авторизованного пользователя
	if (user && (await user.matchPassword(password))) {
		const token = generateToken(user._id)

		res.json({ user, token })
	} else {
		res.status(401)
		throw new Error('Неправильный email или пароль')
	}
})
