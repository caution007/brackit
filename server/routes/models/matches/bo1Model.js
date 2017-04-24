const mongoose = require('mongoose');

var bo1Schema = new mongoose.Schema ({
  matchId: String,
  partakers: Array,
  resultInput: Object,
  victor: String,
}, {
  versionKey: false
});

var Bo1 = mongoose.model('Bo1Match', bo1Schema);

module.exports = {
    Bo1: Bo1
}