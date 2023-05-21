const mongoose = require('mongoose');
const { linkRegEx } = require('../validation/constants');

const movieSchema = new mongoose.Schema({
	country: {
		required: true,
		type: String,
	},
	// — страна создания фильма. Обязательное поле-строка.
	director: {
		required: true,
		type: String,
	},
	// — режиссёр фильма. Обязательное поле-строка.
	duration: {
		required: true,
		type: Number,
	},
	// — длительность фильма. Обязательное поле-число.
	year: {
		required: true,
		type: String,
	},
	// — год выпуска фильма. Обязательное поле-строка.
	description: {
		required: true,
		type: String,
	},
	// — описание фильма. Обязательное поле-строка.
	image: {
		required: true,
		type: String,
		validate: {
			validator: (value) => linkRegEx.test(value),
			message: 'Невалидная ссылка',
		},
	},
	// — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
	trailerLink: {
		required: true,
		type: String,
		validate: {
			validator: (value) => linkRegEx.test(value),
			message: 'Невалидная ссылка',
		},
	},
	// — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
	thumbnail: {
		required: true,
		type: String,
		validate: {
			validator: (value) => linkRegEx.test(value),
			message: 'Невалидная ссылка',
		},
	},
	// — миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
	owner: {
		required: true,
		type: String,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	// — _id пользователя, который сохранил фильм. Обязательное поле.
	movieId: {
		required: true,
		type: String,
	},
	// — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
	nameRU: {
		required: true,
		type: String,
	},
	// — название фильма на русском языке. Обязательное поле-строка.
	nameEN: {
		required: true,
		type: String,
	},
	// — название фильма на английском языке. Обязательное поле-строка.
},
	{ versionKey: false },
);
module.exports = mongoose.model('movie', movieSchema);
