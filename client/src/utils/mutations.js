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
mutation saveExercise($name: String, $bodyPart: String, $id: String, $equipment: String!, $gifUrl: String, $target: String){
    saveExercise(name: $name, bodyPart: $bodyPart, id: $id, equipment: $equipment, gifUrl: $gifUrl, target: $target){
        _id
        username
        email
        savedExercises{
          name
          bodyPart
          id
          equipment
          gifUrl
          target
        }
    }
  }
`

export const REMOVE_EXERCISE = gql`
mutation removeExercise($id:String!){
    removeExercise(id:$id){
      username
      email
      _id
      savedExercises{
        name
        bodyPart
        id
        equipment
        gifUrl
        target
      }
    }
  }
`

export const SAVE_ROUTINE = gql `
mutation saveRoutine($name: String, $bodyPart: String, $id: String, $equipment: String!, $gifUrl: String, $target: String){
    saveRoutine(name: $name, bodyPart: $bodyPart, id: $id, equipment: $equipment, gifUrl: $gifUrl, target: $target){
        _id
        username
        email
        savedExercises{
          name
          bodyPart
          id
          equipment
          gifUrl
          target
        }
        routine{
          name
          bodyPart
          id
          equipment
          gifUrl
          target
        }
    }
  }
`

export const SAVE_ROUTINE2 = gql `
mutation saveRoutine2($name: String, $bodyPart: String, $id: String, $equipment: String!, $gifUrl: String, $target: String){
    saveRoutine2(name: $name, bodyPart: $bodyPart, id: $id, equipment: $equipment, gifUrl: $gifUrl, target: $target){
        _id
        username
        email
        savedExercises{
          name
          bodyPart
          id
          equipment
          gifUrl
          target
        }
        routine2{
          name
          bodyPart
          id
          equipment
          gifUrl
          target
        }
    }
  }
`

export const SAVE_ROUTINE3 = gql `
mutation saveRoutine3($name: String, $bodyPart: String, $id: String, $equipment: String!, $gifUrl: String, $target: String){
    saveRoutine3(name: $name, bodyPart: $bodyPart, id: $id, equipment: $equipment, gifUrl: $gifUrl, target: $target){
        _id
        username
        email
        savedExercises{
          name
          bodyPart
          id
          equipment
          gifUrl
          target
        }
        routine3{
          name
          bodyPart
          id
          equipment
          gifUrl
          target
        }
    }
  }
`

export const SAVE_ROUTINE4 = gql `
mutation saveRoutine4($name: String, $bodyPart: String, $id: String, $equipment: String!, $gifUrl: String, $target: String){
    saveRoutine4(name: $name, bodyPart: $bodyPart, id: $id, equipment: $equipment, gifUrl: $gifUrl, target: $target){
        _id
        username
        email
        savedExercises{
          name
          bodyPart
          id
          equipment
          gifUrl
          target
        }
        routine4{
          name
          bodyPart
          id
          equipment
          gifUrl
          target
        }
    }
  }
`

export const SAVE_ROUTINE5 = gql `
mutation saveRoutine5($name: String, $bodyPart: String, $id: String, $equipment: String!, $gifUrl: String, $target: String){
    saveRoutine5(name: $name, bodyPart: $bodyPart, id: $id, equipment: $equipment, gifUrl: $gifUrl, target: $target){
        _id
        username
        email
        savedExercises{
          name
          bodyPart
          id
          equipment
          gifUrl
          target
        }
        routine5{
          name
          bodyPart
          id
          equipment
          gifUrl
          target
        }
    }
  }
`

export const UPDATE_ROUTINE = gql `
mutation updateRoutine($id: String!){
  updateRoutine(id: $id){
    username
    email
    _id
    savedExercises{
      name
      bodyPart
      id
      equipment
      gifUrl
    }
    routine{
      name
      bodyPart
      id
      equipment
      gifUrl
    }
  }
}
`

export const UPDATE_ROUTINE2 = gql `
mutation updateRoutine2($id: String!){
  updateRoutine2(id: $id){
    username
    email
    _id
    savedExercises{
      name
      bodyPart
      id
      equipment
      gifUrl
    }
    routine2{
      name
      bodyPart
      id
      equipment
      gifUrl
    }
  }
}
`

export const UPDATE_ROUTINE3 = gql `
mutation updateRoutine3($id: String!){
  updateRoutine3(id: $id){
    username
    email
    _id
    savedExercises{
      name
      bodyPart
      id
      equipment
      gifUrl
    }
    routine3{
      name
      bodyPart
      id
      equipment
      gifUrl
    }
  }
}
`

export const UPDATE_ROUTINE4 = gql `
mutation updateRoutine4($id: String!){
  updateRoutine4(id: $id){
    username
    email
    _id
    savedExercises{
      name
      bodyPart
      id
      equipment
      gifUrl
    }
    routine4{
      name
      bodyPart
      id
      equipment
      gifUrl
    }
  }
}
`

export const UPDATE_ROUTINE5 = gql `
mutation updateRoutine5($id: String!){
  updateRoutine5(id: $id){
    username
    email
    _id
    savedExercises{
      name
      bodyPart
      id
      equipment
      gifUrl
    }
    routine5{
      name
      bodyPart
      id
      equipment
      gifUrl
    }
  }
}
`
