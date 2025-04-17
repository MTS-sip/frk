import { gql } from '@apollo/client';

// defines GraphQL mutation to add subcategory to budget category
export const ADD_SUBCATEGORY = gql`
  mutation AddSubcategory($category: String!, $name: String!, $amount: Float!) {
    addSubcategory(category: $category, name: $name, amount: $amount) {
      category
      subcategories {
        name
        amount
      }
    }
  }
`;

// defines GraphQL mutation to update budget amount of specific category
export const UPDATE_BUDGET = gql`
  mutation UpdateBudget($category: String!, $amount: Float!) {
    updateBudget(category: $category, amount: $amount) {
      category
      amount
    }
  }
`;