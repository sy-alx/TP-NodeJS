var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/Users'); 

// '/' est la route racine

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
  res.send(`
        <form action="/login" method="post">
            <label for="email">Email</label>
            <input type="text" id="email" name="Email">
            <label for="password">Password</label>
            <input type="password" id="password" name="password">
            <button type="submit">Login</button>
        </form>
    `);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

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


app.listen(4000, function () {
  console.log("Application d'exemple écoutant sur le port 4000 !");
});