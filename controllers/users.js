const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');

const getUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -__v');

  // if (!user)
  //   return res.status(404).json('The user with the given id was not found');

  res.json(user);
};

const getAllUsers = async (req, res) => {
  const users = await User.find().sort('name');

  res.send(users);
};

const registerUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  await user.save();

  const token = user.generateAuthToken();

  res.cookie('jwt', token, { httpOnly: true });
  res.status(201).json(_.pick(user, ['_id', 'name', 'email']));
};

const updateUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  );
  if (!user)
    return res.status(404).json('The user with the given ID was not found');

  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const user = await User.deleteOne({ _id: req.params.id });

  if (!user)
    return res.status(404).json('The user with the given ID  was not found');

  res.status(200).json(user);
};

module.exports = {
  getUser,
  getAllUsers,
  registerUser,
  deleteUser,
  updateUser,
};
