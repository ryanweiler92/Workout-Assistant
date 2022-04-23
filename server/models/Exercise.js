
const { Schema } = require('mongoose')

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


module.exports = exerciseSchema;