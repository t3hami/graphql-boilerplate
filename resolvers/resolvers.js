const uuidv4 = require('uuid/v4');
const { TodoCollection } = require('../models/models');
let todos = {

};
module.exports.resolvers = {
  Query: {
    hello: () => {
      return 'Hello world! This graphql api end point is developed by Muhammad Tehami.';
    },
    todo: async (parent, { id }) => await TodoCollection.findOne({ _id: id }).exec(),
    todos: async () => await TodoCollection.find({}).exec()

    // return Object.values(todos);
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
    createTodo: async (parent, { description }, { me }) => {
      const id = uuidv4();
      let todo = {
        description,
        isDone: false,
      };

      todo = await TodoCollection.create(todo);
      return todo;
    },
    deleteTodo: async (parent, { id }, { me }) => {
      let response = await TodoCollection.find({ _id: id }).remove().exec();
      if (response.n == 1) return true;
      return false;
    },
    editTodo: async (parent, todo, { me }) => {
        var response;
        await TodoCollection.findOneAndUpdate({_id: todo['id']}, {...todo}, { upsert: true }, function (err, doc) {
          if (err) response = false;
          else response = true;
        });
        return response
    },
  },
};