import { gql } from '@apollo/client';

// set, budget category list- income, housing, healthcare, rnr, food, transpo
export const GET_BUDGET = gql`
  query GetBudget {
    getBudget {
      name
      subcategories {
        name
        amount
      }
    }
  }
`;