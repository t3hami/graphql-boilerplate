const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
require('./db');
const { resolvers } = require('./resolvers/resolvers')
const { schema } = require('./models/schema')

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  graphiql: true
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});