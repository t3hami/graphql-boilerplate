const { TodoCollection } = require('../models/models');


module.exports.resolvers = {
  Query: {
    hello: () => {
      return 'Hello world! This graphql api end point is developed by Muhammad Tehami.';
    },
    todo: async (parent, { id }) => await TodoCollection.findOne({ _id: id }).exec(),
    todos: async () => await TodoCollection.find({}).exec()
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
      let todo = {
        description,
        isDone: false,
      };
      todo = await TodoCollection.create(todo);
      return todo;
    },
    deleteTodo: async (parent, { id }, { me }) => {
      let response = await TodoCollection.find({ _id: id }).remove().exec();
      return (response.n == 1);
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