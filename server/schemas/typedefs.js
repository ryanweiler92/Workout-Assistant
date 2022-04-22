const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    savedExercises: [Exercise]
}

type Exercise{
    name: String
    bodyPart: String
    equipment: String
    id: String
    gifURL: String
    notes: String
}

input ExerciseInput {
name: [String]
bodyPart: String
equipment: String
id: String
gifURL: String
notes: String
}

type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveExercise(exerciseData: ExerciseInput): User
    removeExercise(exerciseId: ID!): User
  }
`;

module.exports = typeDefs