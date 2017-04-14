const mongoose = require('mongoose');

var teamSchema = new mongoose.Schema ({
  name: String,
  members: Array,
  joinPassword: String
}, {
  versionKey: false
});

var Team = mongoose.model('Team', teamSchema);

module.exports = {
    Team: Team
}