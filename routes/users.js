const express = require('express');
const {
  getUser,
  getAllUsers,
  registerUser,
  deleteUser,
  updateUser,
} = require('../controllers/users');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/me', auth, getUser);
router.post('/', registerUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
