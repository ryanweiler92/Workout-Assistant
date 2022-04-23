const { gql } = require('apollo-server-express');

const typeDefs = gql`
type BodyPart {
  _id: ID
  name: String
}

type Exercise{
    name: String
    bodyPart: String
    equipment: String
    id: String
    gifURL: String
    notes: String
}

type SavedExercise {
  _id: ID
  exercises: [Exercise]
}

type User {
  _id: ID
  username: String
  email: String
  savedExercises: [SavedExercise]
}

type Auth {
    token: ID
    user: User
  }

  type Query {
    bodyParts: [BodyPart]
    exercises(bodyPart: ID, name: String): [Exercise]
    exercise(_id: ID!): Exercise
    user: User
    savedExercise(_id: ID!): SavedExercise
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeSavedExercise(exercises: [ID]!): SavedExercise
    updateUser(username: String!, email: String!, password: String!): User
    addSavedExercise(exercises: [ID]!): SavedExercise

  }
`;

module.exports = typeDefs