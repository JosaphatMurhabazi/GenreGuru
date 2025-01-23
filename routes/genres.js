const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
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
router.delete('/:id', [auth, admin], deleteGenre);

module.exports = router;
