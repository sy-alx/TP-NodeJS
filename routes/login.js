// routes/login.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Users');

router.post('/login', async (req, res) => {
  const email = req.body.Email;
  const password = req.body.password;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Invalid email or password.');
  }

  const validPassword = await user.isValidPassword(password);
  if (!validPassword) {
    return res.status(400).send('Invalid email or password.');
  }

  const token = jwt.sign({ _id: user._id }, 'mounmounLeBest');
  res.send(token);
});

module.exports = router;
