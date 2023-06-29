const express = require('express');
const router = express.Router();
const Shooting = require('../models/shootings');

// Obtenir tous les meurtres
router.get('/', async (req, res) => {
  const shootings = await Shooting.find();
  res.send(shootings);
});

// Obtenir un meurtre spécifique
router.get('/:id', async (req, res) => {
  const shooting = await Shooting.findById(req.params.id);
  if (!shooting) return res.status(404).send('meurtre introuvable');
  res.send(shooting);
});

// Ajouter un nouveau meurtre
router.post('/', async (req, res) => {
  let shooting = new Shooting({
    case: req.body.case,
    location: req.body.location,
    date: req.body.date,
    summary: req.body.summary,
    fatalities: req.body.fatalities,
    injured: req.body.injured,
    total_victims: req.body.total_victims,
    age_of_shooter: req.body.age_of_shooter,
    prior_signs_mental_health_issues: req.body.prior_signs_mental_health_issues,
    mental_health_details: req.body.mental_health_details,
    weapons_obtained_legally: req.body.weapons_obtained_legally,
    where_obtained: req.body.where_obtained,
    weapon_type: req.body.weapon_type,
    weapon_details: req.body.weapon_details,
    race: req.body.race,
    gender: req.body.gender,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    type: req.body.type,
    year: req.body.year
  });
  shooting = await shooting.save();
  res.send(shooting);
});

// Mettre à jour un meurtre existant
router.put('/:id', async (req, res) => {
  const shooting = await Shooting.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!shooting) return res.status(404).send('meurtre introuvable');
  res.send(shooting);
});

// Supprimer un meurtre
router.delete('/:id', async (req, res) => {
  const shooting = await Shooting.findByIdAndRemove(req.params.id);
  if (!shooting) return res.status(404).send('meurtre introuvable');
  res.send(shooting);
});

module.exports = router;
