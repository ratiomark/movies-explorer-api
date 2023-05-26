// Использовал express-validator вместо joi, тесты все проходит, валидирует как нужно
const { body, param, validationResult } = require('express-validator');
const isValidObjectId = require('mongoose').mongoose.Types.ObjectId.isValid;
const { ApiError } = require('../Errors/Errors');

// auth
const registerValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Слишком короткий пароль').isLength({ min: 3 }),
	body('name', 'Слишком короткое имя').isLength({ min: 2, max: 30 }),
];

const loginValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Слишком короткий пароль').isLength({ min: 3 }),
];


// movie
const postMovieValidation = [
	body('country').notEmpty(),
	body('director').notEmpty(),
	body('duration').isNumeric().notEmpty(),
	body('year').notEmpty(),
	body('description').notEmpty(),
	body('image').isURL(),
	body('trailerLink').isURL(),
	body('thumbnail').isURL(),
	body('movieId').notEmpty(),
	body('nameRU').notEmpty(),
	body('nameEN').notEmpty(),
];

const movieIdParamsValidation = [
	param('movieId').notEmpty()
];
// const movieIdParamsValidation = [
// 	param('movieId').custom((value) => {
// 		if (!isValidObjectId(value)) throw ApiError.BadRequest();
// 		return true;
// 	}),
// ];

// user
const patchUserDataValidation = [
	body('email').isEmail(),
	body('name').isLength({ min: 2, max: 30 }),
];


const userIdParamsValidation = [
	param('userId').custom((value) => {
		if (!isValidObjectId(value)) throw ApiError.BadRequest();
		return true;
	}),
];


// eslint-disable-next-line consistent-return
const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return next(ApiError.BadRequest());
	next();
};

module.exports = {
	// auth
	registerValidation,
	loginValidation,

	// movie
	postMovieValidation,
	movieIdParamsValidation,

	// user
	patchUserDataValidation,
	userIdParamsValidation,

	//handler
	handleValidationErrors,
};
