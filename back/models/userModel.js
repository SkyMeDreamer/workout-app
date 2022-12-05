//проверка пользователя
import mongoose from 'mongoose' //позволяет соединиться с БД
import bcrypt from 'bcryptjs' //позволяет работать с паролями

const userSсhema = mongoose.Schema(
	{
		name: String,
		password: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		images: {
			before: String,
			after: String
		}
	},
	{
		minimize: false, //дает команду не удалять не заполненные поля
		timestamps: true //создает поле дата и время
	}
)

//создаем метод matchPassword, который будет сравнивать введенный пароль с текущим
userSсhema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

//если пароль не менялся то идем дальше
userSсhema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}
	//если пароль менялся, то мы еще шифруем по новой и записываем
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

//то как мы будем обращаться к этйо модели из других мест
const User = mongoose.model('User', userSсhema)

export default User