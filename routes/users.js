const express = require('express');
const {
  getUser,
  getAllUsers,
  registerUser,
  deleteUser,
  updateUser,
} = require('../controllers/users');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', registerUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
