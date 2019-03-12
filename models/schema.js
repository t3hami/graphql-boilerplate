const { gql } = require('apollo-server-express');

module.exports.schema = gql`
  type Query {
    hello: String,
    todo(id: ID!): Todo,
    todos: [Todo!]
  }

  type Todo {
    id: ID,
    description: String,
    isDone: Boolean
  }

  type Mutation {
    createTodo(description: String!): Todo!,
    deleteTodo(id: String!): Boolean!,
    editTodo(id: String!, description: String, isDone: Boolean): Boolean!
  }
`;