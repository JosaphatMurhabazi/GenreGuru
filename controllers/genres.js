const Genre = require('../models/Genre');
const Joi = require('joi');

const getGenre = async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).json('The genre with the given id was not found');

  res.send(genre);
};

const getAllGenres = async (req, res) => {
  const genres = await Genre.find().sort('name');

  res.send(genres);
};

const createGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.status(200).json(genre);
};

const deleteGenre = async (req, res) => {
  const genre = await Genre.deleteOne({ _id: req.params.id });

  if (!genre)
    return res.status(404).json('The genre with the given ID  was not found');

  res.status(200).json(genre);
};
const updateGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).json('The genre with the given ID was not found');

  res.status(200).json(genre);
};

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });

  return schema.validate(genre);
}

module.exports = {
  getGenre,
  getAllGenres,
  createGenre,
  deleteGenre,
  updateGenre,
};
