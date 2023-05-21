const router = require('express').Router();
const {
	postMovieValidation,
	movieIdParamsValidation,
	handleValidationErrors
} = require('../validation/validationNew');

const {
	getMovies,
	postMovie,
	deleteMovie,
} = require('../controllers/movies');

router.delete(
	'/:movieId',
	movieIdParamsValidation,
	handleValidationErrors,
	deleteMovie,
);

router.get('', getMovies);

router.post(
	'',
	postMovieValidation,
	handleValidationErrors,
	postMovie,
);

module.exports = router;
