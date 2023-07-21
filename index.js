// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const loginRouter = require('./routes/login');
const shootingRouter = require('./routes/shootings'); 
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://127.0.0.1:27017/NodeJS', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// Use the login route handler for POST requests to '/login'
app.use('/login', loginRouter);

// Use the shooting route handler for requests to '/shootings'
app.use('/shootings', auth, shootingRouter);

// Add your 404 error handler here
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

// Add your error handling middleware here
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('quelque chose ne va pas ');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur en écoute sur le port ${port}...`));
