const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const otherRouter = require('./otherRoutes');

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/*', otherRouter);

module.exports = {
  router,
};
