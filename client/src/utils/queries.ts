import {gql} from '@apollo/client';

export const GET_ME = gql`
  query GetAllUsers {
    users {
      id
      username
      email
      bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
  }
`;