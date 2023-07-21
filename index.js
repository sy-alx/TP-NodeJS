const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = require('./routes/login');

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

// Add your 404 error handler here
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

const portAuth  = 4000;
app.listen(portAuth, () => console.log(`Serveur d'authentification en écoute sur le port ${portAuth}...`));
