const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('User'); // Assurez-vous d'avoir défini votre modèle d'utilisateur

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

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
