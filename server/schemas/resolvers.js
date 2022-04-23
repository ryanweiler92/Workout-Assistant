const { User, Exercise, SavedExercise } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    bodyParts: async () => {
      return await BodyPart.find();
    },
    exercises: async (parent, { bodyPart, name }) => {
      const params = {};

      if (bodyPart) {
        params.bodyPart = bodyPart;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Exercise.find(params).populate('bodyPart');
    },
    exercise: async (parent, { _id }) => {
      return await Exercise.findById(_id).populate('bodyPart');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'savedExercises.exercises',
          populate: 'bodyPart'
        });

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'savedExercises.exercises',
          populate: 'bodyPart'
        });

        return user.savedExercises.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addSavedExercise: async (parent, { exercises }, context) => {
      console.log(context);
      if (context.user) {
        const savedExercise = new SavedExercise({ exercises });

        await User.findByIdAndUpdate(context.user._id, { $push: { savedExercises: savedExercise } });

        return savedExercise;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
}
}

      
module.exports = resolvers;






// const resolvers = {
//     Query: {
//       me: async (_parent, _args, context) => {
//         if (context.user) {
//             const userData = await User.findOne({ _id: context.user._id })
//                 .select('-__v -password');
  
//             return userData;
//         }
//         throw new AuthenticationError('You are not logged in.');
//     }
//     },
//     Mutation: {
//       addUser: async (_parent, args) => {
//         const user = await User.create(args);
//         const token = signToken(user);
  
//         return { token, user };
  
//     },
//     login: async (_parent, { email, password }) => {
//         const user = await User.findOne({ email });
  
//         if (!user) {
//             throw new AuthenticationError('User not found!');
//         }
  
//         const correctPw = await user.isCorrectPassword(password);
  
//         if (!correctPw) {
//             throw new AuthenticationError('Incorrect Password!');
//         }
  
//         const token = signToken(user);
//         return { token, user };
//     },
    
//     saveExercise: async (_parent, { exerciseData }, context) => {
//         if (context.user) {
//             const updatedUser = await User.findByIdAndUpdate(
//                 { _id: context.user._id },
//                 { $push: { savedExercises: exerciseData } },
//                 { new: true }
//             );
//             return updatedUser;
//         }
//         throw new AuthenticationError('Please log in.');
//     },
//     removeExercise: async (_parent, { exerciseId }, context) => {
//         if (context.user) {
//             const updatedUser = await User.findOneAndUpdate(
//                 { _id: context.user._id },
//                 { $pull: { savedExercises: { exerciseId } } },
//                 { new: true }
//             );
//             return updatedUser;
//         }
//         throw new AuthenticationError('Please log in');
//     }
//   }
//       };