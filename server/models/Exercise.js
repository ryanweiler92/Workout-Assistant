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
  equipment: {
    type: String
  },
  gifURL: {
    type: String
  },
  id: {
    type: Number,
    min: 0,
    default: 0
  },
  notes: {
    type: String
  }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
