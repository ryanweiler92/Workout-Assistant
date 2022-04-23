const db = require('./connection');
const { User, Exercise } = require('../models');

db.once('open', async () => {
  await bodyPart.deleteMany();

  const bodyParts = await bodyPart.insertMany([
    { name: 'Back' },
    { name: 'Biceps' },
    { name: 'Triceps' },
    { name: 'Quads' },
    { name: 'Core' }
  ]);

  console.log('body parts seeded');

  const exercises = await Exercise.insertMany([
    {
      name: 'Cookies',
      bodyPart: bodyParts[0]._id,
      id: 001,
      equipment: 'dumbells',
      gifURL: 'https://media.giphy.com/media/Zaej3GIZTzCI8/giphy.gif',
      notes: ''
    },
    {
        name: 'Oreos',
        bodyPart: bodyParts[1]._id,
        id: 002,
        equipment: 'dumbells',
        gifURL: 'https://media.giphy.com/media/Zaej3GIZTzCI8/giphy.gif',
        notes: ''
      },
      {
        name: 'Goldfish',
        bodyPart: bodyParts[2]._id,
        id: 003, 
        equipment: 'dumbells',
        gifURL: 'https://media.giphy.com/media/Zaej3GIZTzCI8/giphy.gif',
        notes: ''
      },
      {
        name: 'Popcorn',
        bodyPart: bodyParts[3]._id,
        id: 004,
        equipment: 'dumbells',
        gifURL: 'https://media.giphy.com/media/Zaej3GIZTzCI8/giphy.gif',
        notes: ''
      },
      {
        name: 'Crackers',
        bodyPart: bodyParts[4]._id,
        id: 004,
        equipment: 'dumbells',
        gifURL: 'https://media.giphy.com/media/Zaej3GIZTzCI8/giphy.gif',
        notes: ''
      }
  ]);

  console.log('exercises seeded');

  await User.deleteMany();

  await User.create({
    username: 'Pamela',
    email: 'pamela@testmail.com',
    password: 'password12345',
    savedExercises: [
      {
        exercises: [exercises[0]._id, exercises[1]._id]
      }
    ]
  });

  await User.create({
    username: 'Elijah',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});

