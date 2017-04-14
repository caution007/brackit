const mongoose = require('mongoose');

var matchSchema = new mongoose.Schema ({
  tournamentId: String,
  type: String,
  start: Date,
  complete: Boolean
}, {
  versionKey: false
});

var Match = mongoose.model('Match', matchSchema);

module.exports = {
    Match: Match
}