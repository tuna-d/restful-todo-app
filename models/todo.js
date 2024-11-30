const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    require: true,
  },
  due: {
    type: String,
  },
  importance: {
    type: String,
    require: true,
  },
})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo
