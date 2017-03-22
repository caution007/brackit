const mongoose = require('mongoose');

var bo1Schema = new mongoose.Schema ({
  matchtId: String,
  partakers: Array,
  victor: String
});

var Bo1 = mongoose.model('Bo1Match', bo1Schema);

module.exports = {
    Bo1: Bo1
}