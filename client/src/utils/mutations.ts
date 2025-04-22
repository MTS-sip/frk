import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;


export const SIGNUP_USER = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

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

export const UPDATE_SUBCATEGORY = gql`
  mutation UpdateSubcategory($categoryName: String!, $subcategoryInput: SubcategoryInput!) {
    updateSubcategory(categoryName: $categoryName, subcategoryInput: $subcategoryInput) {
      name
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

export const GET_BUDGET_BUDGET = gql`
  mutation UpdateBudget($category: String!, $amount: Float!) {
    updateBudget(category: $category, amount: $amount) {
      category
      amount
    }
  }
`;