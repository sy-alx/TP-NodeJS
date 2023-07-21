const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.post('/login', async (req, res) => {
  const email = req.body.Email;
  const password = req.body.password;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Invalid email or password.');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid email or password.');
  }

  const token = jwt.sign({ _id: user._id }, 'mounmounLeBest');
  res.send(token);
});

module.exports = router;
