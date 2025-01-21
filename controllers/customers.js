const Joi = require('joi');
const Customer = require('../models/customer.js');

const getAllCustomers = async (req, res) => {
  const customers = await Customer.find();

  res.status(200).json(customers);
};

const createCustomer = async (req, res) => {
  const { error } = customerValidate(req.body);
  if (error) return res.status(404).json(error.details[0].message);

  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  customer = await customer.save();

  res.status(201).json(customer);
};
const getCustomer = async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res.status(404).json('The customer with the given id was not found');

  res.status(200).json(customer);
};
const updateCustomer = async (req, res) => {
  const { error } = customerValidate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    { _id: req.params.id },
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    }
  );

  if (!customer)
    return res.status(404).json('The customer with the given id was not found');

  res.status(200).json(customer);
};
const deleteCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndDelete({ _id: req.params.id });

  if (!customer)
    return res.status(404).json('The customer with the given id was not found');

  res.status(200).json(customer);
};

function customerValidate(customer) {
  const customerSchema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(10).required(),
  });

  return customerSchema.validate(customer);
}

module.exports = {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
