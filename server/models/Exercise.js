const mongoose = require('mongoose');

const { Schema } = mongoose;

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  bodyPart: {
    type: String
  },
  id: {
    type: String
  },
  equipment: {
    type: String
  },
  gifURL: {
    type: String
  },
  notes: {
    type: String
  }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
