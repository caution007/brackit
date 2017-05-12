const mongoose = require('mongoose');

var profileSchema = new mongoose.Schema ({
  userId: String,
  username: String,
  firstName: String,
  familyName: String,
  age: Number,
  tournaments: Array,
  joined: Date,
  matches: Array,
  teams: Array,
  compSpecs: Object,
  steam: String,
  gamingInfo: Object,
  biography: String

}, {
  versionKey: false
});

var Profile = mongoose.model('Profile', profileSchema);

module.exports = {
    Profile: Profile
}