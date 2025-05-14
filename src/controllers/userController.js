const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ROLES = require('../config/roles');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @desc Register user (no role assigned)
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

// @desc Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// @desc Assign role (management only)
const assignRole = async (req, res) => {
  const { userId, role } = req.body;

  if (![ROLES.OPERATOR, ROLES.HELPER].includes(role)) {
    return res.status(400).json({ message: 'Invalid role assignment' });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.role = role;
  await user.save();

  res.json({ message: `Role ${role} assigned to ${user.name}` });
};

module.exports = { registerUser, loginUser, assignRole };
