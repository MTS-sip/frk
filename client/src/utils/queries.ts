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

export const GET_BUDGET = gql`
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


export const GET_ME = gql`
  query Me {
    me {
      username
    }
  }
`;

export const GET_SUBCATEGORIES = gql`
  query GetSubcategories {
    getUser {
      budget {
        subcategories {
          name
          amount
        }
      }
    }
  }
`;

