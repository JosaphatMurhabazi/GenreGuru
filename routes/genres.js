const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
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
router.get('/:id', validateObjectId, getGenre);
router.post('/', auth, createGenre);
router.put('/:id', validateObjectId, updateGenre);
router.delete('/:id', [auth, admin], validateObjectId, deleteGenre);

module.exports = router;
