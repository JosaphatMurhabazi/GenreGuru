const express = require('express');
const {
  customerValidate,
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customers');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getAllCustomers);
router.get('/:id', getCustomer);
router.post('/', validate(customerValidate), createCustomer);
router.put('/:id', validate(customerValidate), updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
