const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const Joi = require('joi');

const createReturns = async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) return res.status(404).json('No rental found.');

  if (rental.dateReturned)
    return res.status(400).json('Return already processed!');

  rental.return();
  rental.save();

  await Movie.updateOne(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 },
    }
  );

  return res.json(rental);
};

function validateReturns(req) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(req);
}

module.exports = { createReturns, validateReturns };
