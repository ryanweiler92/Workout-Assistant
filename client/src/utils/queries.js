import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user{
    user{
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