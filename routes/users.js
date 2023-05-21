const router = require('express').Router();
const {
  patchUserDataValidation,
  handleValidationErrors,
} = require('../validation/validationNew');

const {
  getUserData,
  updateUserProfile,
} = require('../controllers/users');


router.patch(
  '/me',
  patchUserDataValidation,
  handleValidationErrors,
  updateUserProfile,
);

router.get('/me', getUserData);

module.exports = router;
