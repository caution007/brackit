const mongoose = require('mongoose');

var profileSchema = new mongoose.Schema ({
  userId: String,
  username: String,
  firstName: String,
  familyName: String,
  tournaments: Array,
  matches: Array
}, {
  versionKey: false
});

var Profile = mongoose.model('Profile', profileSchema);

module.exports = {
    Profile: Profile
}