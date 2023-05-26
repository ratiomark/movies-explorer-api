const Movie = require('../models/movies');

const { ApiError } = require('../Errors/Errors');

const getMovies = async (req, res, next) => {
	try {
		const { userId } = req;
		const data = await Movie.find({ owner: userId });
		const dataWithId = data.map(item => {
			const data = { ...item }
			data['id'] = item.movieId
			return data
		})
		res.send({ data: dataWithId });
	} catch (err) {
		next(err);
	}
};

const postMovie = async (req, res, next) => {
	try {
		const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
		const { userId } = req;

		const data = await Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: userId });
		res.status(201).send({ data });
	} catch (err) {
		next(err);
	}
};

const deleteMovie = async (req, res, next) => {
	try {
		const { movieId } = req.params;
		const { userId } = req;
		const movie = await Movie.findById(movieId);

		if (!movie) throw ApiError.NotFound();
		if (userId !== movie.owner.toString()) throw ApiError.Forbidden();

		const data = await movie.deleteOne();

		res.send({ data });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getMovies,
	postMovie,
	deleteMovie,
};
