const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createReturns, validateReturns } = require('../controllers/returns');
const router = express.Router();

router.post('/', [auth, validate(validateReturns)], createReturns);
module.exports = router;
