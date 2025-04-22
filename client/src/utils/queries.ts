import { gql } from '@apollo/client';

// fetch the user, including their budget
export const GET_USER = gql`
  query GetUser {
    getUser {
      username
      budget {
        name
        subcategories {
          name
          amount
        }
      }
    }
  }
`;
