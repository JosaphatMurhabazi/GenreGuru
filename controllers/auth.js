const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../models/user');

const loginUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json('Invalid email or password.');

  const token = user.generateAuthToken();
  res.cookie('jwt', token, { httpOnly: true });
  res.status(200).json(token);
};

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = { loginUser };
