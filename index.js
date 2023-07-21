var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const User = require('./models/Users'); 
const loginRouter = require('./routes/login'); // Importez le routeur

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

app.use('/', loginRouter); // Utilisez le routeur

app.listen(4000, function () {
  console.log("Application d'exemple écoutant sur le port 4000 !");
});
