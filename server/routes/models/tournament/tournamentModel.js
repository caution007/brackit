const mongoose = require('mongoose');

var tournamentSchema = new mongoose.Schema ({
  name: String,
  type: String,
  registrationType: String,
  fixtureSortType: String,
  competitorType: String,
  includeDraws: Boolean,
  start: Date,
  matchType: String,
  information: String,
  rules: String,
  started: Boolean,
  complete: Boolean,
  victor: String,
  owner:  String
}, {
  versionKey: false
});

var Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = {
    Tournament: Tournament
}