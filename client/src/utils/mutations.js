import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password){
      token
      user {
        username
        email
        _id
      }
    }
  }
`

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password){
        token 
        user{
      _id
      username 
      email
    }
  }
}
`

export const SAVE_EXERCISE = gql `
mutation saveExercise( $name: String, $bodyPart: String, $id: String, $equipment: String!, $gifURL: String ){
    saveExercise(name: $name, bodyPart: $bodyPart, id: $id, equipment: $equipment, gifURL: $gifURL){
        _id
        username
        email
        savedExercises{
          name
          bodyPart
          id
          equipment
          gifURL
        }
    }
  }
`

export const REMOVE_EXERCISE = gql`
mutation removeExercise($id:ID!){
    removeExercise(id:$id){
      username
      email
      _id
      savedExercises{
        name
        bodyPart
        id
        equipment
        gifURL
      }
    }
  }
`
