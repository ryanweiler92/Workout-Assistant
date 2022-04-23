const mongoose = require('mongoose');

const { Schema } = mongoose;

const savedExerciseSchema = new Schema({
  savedExercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exercise'
    }
  ]
});

const SavedExercise = mongoose.model('SavedExercise', savedExerciseSchema);

module.exports = SavedExercise; 
