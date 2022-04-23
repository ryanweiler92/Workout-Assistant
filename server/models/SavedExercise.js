const mongoose = require('mongoose');

const { Schema } = mongoose;

const savedSchema = new Schema({
  savedExercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exercise'
    }
  ]
});

const SavedExercise = mongoose.model('SavedExercise', savedSchema);

module.exports = SavedExercise; 
