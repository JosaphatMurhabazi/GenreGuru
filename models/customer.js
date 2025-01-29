const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema(
  {
    isGold: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    phone: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 10,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model('Customer', customerSchema);

function customerValidate(customer) {
  const customerSchema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(10).required(),
  });

  return customerSchema.validate(customer);
}

module.exports = {
  Customer,
  customerValidate,
};
