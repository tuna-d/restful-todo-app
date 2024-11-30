const mongoose = require("mongoose")
const Todo = require("./models/todo")

mongoose
  .connect("mongodb://127.0.0.1:27017/todoApp")
  .then(() => {
    console.log("connected to the database")
  })
  .catch((err) => {
    console.log("ERROR", err)
  })

const firstTodo = new Todo({
  task: "You can create and edit tasks.",
  due: "24.03.2024",
  importance: "Normal",
})

firstTodo
  .save()
  .then((res) => {
    console.log(res)
  })
  .catch((e) => {
    console.log(`houston, we have a problem: ${e}`)
  })
