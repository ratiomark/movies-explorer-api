const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const { ApiError } = require('../Errors/Errors');
const { updateUser, findUserById } = require('../utils/updateUser');

const createUser = async (req, res, next) => {
	try {
		const {
			name, email, password: userPassword,
		} = req.body;

		const passwordHash = await bcrypt.hash(userPassword, 7);
		const data = await User.create({
			name, password: passwordHash, email,
		});

		const { password, ...otherData } = data._doc;
		res.status(200).json({ data: { ...otherData } });
	} catch (error) {
		if (error.code === 11000) {
			next(ApiError.Conflict());
			return;
		}
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email }).select('+password');
		if (!user) throw ApiError.Unauthorized();

		const isPassEquals = await bcrypt.compare(password, user.password);
		if (!isPassEquals) throw ApiError.Unauthorized();

		const token = jwt.sign(
			{ id: user._id.toString() },
			process.env.JWT_TOKEN_SECRET || 'secret_key',
			{ expiresIn: '7d' },
		);
		res.status(200).json({ token });
	} catch (error) {
		next(error);
	}
};


const getUserData = async (req, res, next) => {
	try {
		const user = await findUserById(req);
		res.status(200).json({ data: user });
	} catch (error) {
		next(error);
	}
};

const updateUserProfile = async (req, res, next) => {
	try {
		const { name, email } = req.body;
		const { userId } = req
		const data = await User.findByIdAndUpdate(
			userId,
			{ name, email },
			{ new: true, runValidators: true },
		);

		if (!data) throw ApiError.BadRequest();
		res.send({ data });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	// auth
	createUser,
	login,

	// user
	getUserData,
	updateUserProfile,
};
