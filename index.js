var express = require('express');
var app = express();
const bodyParser = require('body-parser');

// '/' est la route racine

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
  res.send(`
        <form action="/login" method="post">
            <label for="username">Username</label>
            <input type="text" id="username" name="username">
            <label for="password">Password</label>
            <input type="password" id="password" name="password">
            <button type="submit">Login</button>
        </form>
    `);
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Here you should implement your logic to check the username and password
  // If they are valid, you can set the user session and redirect the user to their dashboard
  // If they are not valid, you can redirect them back to the login page with an error message
  res.send(`Username: ${username}, Password: ${password}`);
});


app.listen(4000, function () {
  console.log("Application d'exemple écoutant sur le port 4000 !");
});