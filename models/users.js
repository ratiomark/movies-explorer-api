const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isUrl = require('validator/lib/isURL');

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => isEmail(value),
        message: 'Неправильный формат почты',
      },
    },
    name: {
			type: String,
			required: true,
      minLength: 2,
      maxLength: 30,
      trim: true,
    },
  },
  { versionKey: false },
);
module.exports = mongoose.model('user', userSchema);
