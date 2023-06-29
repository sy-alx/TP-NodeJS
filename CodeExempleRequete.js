const express = require('express');
const app = express();
app.use(express.json()); // Pour le parsing du JSON

let users = [
  { id: 1, name: 'Maxime' },
  { id: 2, name: 'Syrill' },
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('utilisateur non trouvé');
  }
});

app.post('/users', (req, res) => {
  const user = { id: Date.now(), name: req.body.name };
  users.push(user);
  res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index > -1) {
    users[index].name = req.body.name;
    res.json(users[index]);
  } else {
    res.status(404).send('utilisateur non trouvé');
  }
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index > -1) {
    const user = users.splice(index, 1);
    res.json(user);
  } else {
    res.status(404).send('utilisateur non trouvé');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Le serveur est sur le port : ${port}`));
