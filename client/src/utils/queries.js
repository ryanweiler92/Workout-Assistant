import { gql } from '@apollo/client';

//these arent correct, just added so i didn't get an error

export const GET_ME = gql`
query me {
    me{
      username
      email
      _id
      }
    }
`;

export const QUERY_USER = gql`
query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
    }
}
`