const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  description: String,
  isDone: Boolean
});

const TodoCollection = mongoose.model('todos', todoSchema); 

module.exports = {
  TodoCollection
};