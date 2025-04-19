import { gql } from '@apollo/client';

// set, budget category list- income, housing, healthcare, rnr, food, transpo
export const GET_BUDGET = gql`
  query getBudget {
    budget {
      Income
      Housing
      Healthcare
      Rnr
      Food
      Transpo
    }
  }
`;