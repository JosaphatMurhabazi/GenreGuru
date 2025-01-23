const express = require('express');
const auth = require('../middleware/auth');
const {
  getGenre,
  getAllGenres,
  createGenre,
  deleteGenre,
  updateGenre,
} = require('../controllers/genres');
const router = express.Router();

router.get('/', getAllGenres);
router.get('/:id', getGenre);
router.post('/', auth, createGenre);
router.put('/:id', updateGenre);
router.delete('/:id', deleteGenre);

module.exports = router;
