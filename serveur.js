const express = require('express');
const mongoose = require('mongoose');
const shootingRouter = require('./routes/shootings'); 
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://127.0.0.1:27017/NodeJS', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const app = express();
app.use(express.json()); // Pour le parsing du JSON

app.use('/shootings', auth, shootingRouter); // utilisation du routeur shootings pour les requêtes'/shootings'

app.use((err, req, res, next) => { // Middleware pour la gestion des erreurs
  console.error(err.stack);
  res.status(500).send('quelque chose ne va pas ');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port du serveur : ${port}`));
