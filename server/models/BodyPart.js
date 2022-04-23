const mongoose = require('mongoose');

const { Schema } = mongoose;

const bodyPartSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const BodyPart = mongoose.model('BodyPart', bodyPartSchema);

module.exports = BodyPart; 
