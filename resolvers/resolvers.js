const uuidv4 = require('uuid/v4');
let todos = {

};
module.exports.resolvers = {
    Query: {
      hello: () => {
        return 'Hello world! This graphql api end point is developed by Muhammad Tehami.';
      },
      todo: (parent, { id }) => {
        return todos[id];
      },
      todos: async () => {
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
      createTodo: async (parent, { description }, { me }) => {
        const id = uuidv4();
        const todo = {
          id,
          description,
          isDone: false,
        };
  
        todos[id] = todo;
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