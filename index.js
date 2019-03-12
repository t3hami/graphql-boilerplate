const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const uuidv4 = require('uuid/v4');

const app = express();

app.use(cors());

const schema = gql`
  type Query {
    hello: String,
    todo(id: ID!): Todo,
    todos: [Todo!]
  }

  type Todo {
    id: ID!,
    description: String,
    isDone: Boolean
  }

  type Mutation {
    createTodo(description: String!): Todo!,
    deleteTodo(id: String!): Boolean!,
    editTodo(id: String!, description: String, isDone: Boolean): Boolean!
  }
`;

let todos = {
  
};

const resolvers = {
  Query: {    
    hello: ()=> {
      return 'Hello world! This graphql api end point is developed by Muhammad Tehami.';
    },    
    todo: (parent, { id }) => {
      return todos[id];
    },
    todos: () => {
      return Object.values(todos);
    },
  },
  Todo: {
    description: todo => {
      return todo.description;
    },
    isDone: todo => {
      return todo.isDone;
    },
  },
  Mutation: {
    createTodo: (parent, { description }, { me }) => {
      const id = uuidv4();
      const todo = {
        id,
        description,
        isDone: false,
      };

      todos[id] = todo;
      // todos[me.id].messageIds.push(id);
      return todo;
    },
    deleteTodo: (parent, { id }, { me }) => {
      console.log(id);
      console.log(todos[id]);
      if (delete todos[id]) return true;
      else return false;
    },
    editTodo: (parent, todo, { me }) => {
      if (!todo['description'] && todo['isDone']) {
        todos[todo['id']]['isDone'] = todo['isDone'];
        return true;
      }
      else if (todo['description'] && !todo['isDone']) {
        todos[todo['id']]['description'] = todo['description'];
        return true;
      }
      else if (todo['description'] && todo['isDone']) {
        todos[todo['id']] = todo;
        return true;
      }
      return false;
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  graphiql: true
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});