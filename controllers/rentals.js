const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');

const getAllRentals = async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.status(200).json(rentals);
};

const createRental = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).json('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).josn('Invalid movie.');

  if (movie.numberInStock === 0)
    return res.status(400).json('Movie not in stock.');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  rental = await rental.save();

  movie.numberInStock--;
  movie.save();

  res.status(200).json(rental);
};

const getRental = async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).json('The rental with the given ID was not found.');

  res.status(200).json(rental);
};

module.exports = {
  getAllRentals,
  getRental,
  createRental,
};
