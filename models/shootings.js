const mongoose = require('mongoose');

const shootingSchema = new mongoose.Schema({
  case: String,
  location: String,
  date: String,
  summary: String,
  fatalities: Number,
  injured: Number,
  total_victims: Number,
  age_of_shooter: Number,
  prior_signs_mental_health_issues: String,
  mental_health_details: String,
  weapons_obtained_legally: String,
  where_obtained: String,
  weapon_type: String,
  weapon_details: String,
  race: String,
  gender: String,
  latitude: String,
  longitude: String,
  type: String,
  year: Number
});

const Shooting = mongoose.model('Shooting', shootingSchema);

module.exports = Shooting;
