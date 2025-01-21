const { Movie, validate } = require('../models/movie.js');
const { Genre } = require('../models/genre');

const getAllMovies = async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.status(200).json(movies);
};

const createMovie = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).json('Invalid genre.');

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie = await movie.save();

  res.status(201).json(movie);
};

const updateMovie = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).json('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).json('The movie with the given ID was not found.');

  res.send(movie);
};
const deleteMovie = async (req, res) => {
  const movie = await Movie.findByIdAndDelete({ _id: req.params.id });

  if (!movie)
    return res.status(404).json('The movie with the given ID was not found.');

  res.json(movie);
};

const getMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).jso('The movie with the given ID was not found.');

  res.json(movie);
};

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
