const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const admin = require('../middleware/admin');
const {
  getGenre,
  getAllGenres,
  createGenre,
  deleteGenre,
  updateGenre,
  validateGenre,
} = require('../controllers/genres');
const router = express.Router();

router.get('/', getAllGenres);
router.get('/:id', validateObjectId, getGenre);
router.post('/', [auth, validate(validateGenre)], createGenre);
router.put('/:id', [validateObjectId, validate(validateGenre)], updateGenre);
router.delete('/:id', [auth, admin], validateObjectId, deleteGenre);

module.exports = router;
