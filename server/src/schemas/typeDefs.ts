import { gql } from 'graphql-tag';

const typeDefs = gql`

type BudgetSummary {
  categories: [Category!]!
  total: Float!
}

type Query {
  me: User
  getUser: User
  getBudgetSummary: BudgetSummary!
}

  type Subcategory {
    name: String!
    amount: Float!
  }

  type Category {
    id: ID!
    name: String!
    subcategories: [Subcategory!]!
  }

  input SubcategoryInput {
    name: String!
    amount: Float!
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    budget: [Category!]!
   
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
  getSubcategories: [Subcategory]
}

type Subcategory {
  name: String!
  amount: Float!
}

  type Mutation {
    login(username: String!, password: String!): Auth
    signup(username: String!, password: String!): Auth
    updateSubcategory(categoryName: String!, subcategoryInput: SubcategoryInput!): Category!
  }
`;

export default typeDefs;