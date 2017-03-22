const mongoose = require('mongoose');

var roundRobinSchema = new mongoose.Schema ({
  tournamentId: String,
  teams: Array
});

var RoundRobinLeague = mongoose.model('RoundRobinLeague', roundRobinSchema);

module.exports = {
    RoundRobinLeague: RoundRobinLeague
}