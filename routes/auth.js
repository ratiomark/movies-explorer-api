const authRouter = require('express').Router();
const {
	registerValidation,
	loginValidation,
	handleValidationErrors,
} = require('../validation/validationNew');
const { createUser, login } = require('../controllers/users');


authRouter.post(
	'/signup',
	registerValidation,
	handleValidationErrors,
	createUser,
);

authRouter.post(
	'/signin',
	loginValidation,
	handleValidationErrors,
	login,
);

module.exports = {
	authRouter,
};
