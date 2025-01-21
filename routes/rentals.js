const {
  getAllRentals,
  getRental,
  createRental,
} = require('../controllers/rentals');
const express = require('express');
const router = express.Router();

router.get('/', getAllRentals);

router.post('/', createRental);

router.get('/:id', getRental);

module.exports = router;
