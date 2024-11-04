const express = require("express")
const app = express()
const port = 3000
const path = require("path")
const { v4: uuidv4 } = require("uuid")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

let todos = [
  {
    id: uuidv4(),
    task: "shopping",
    due: "friday",
    importance: "normal",
  },
  {
    id: uuidv4(),
    task: "car wash",
    due: "monday",
    importance: "urgent",
  },
]

app.get("/", (req, res) => {
  res.render("home", { todos })
})

app.get("/:id", (req, res) => {
  const { id } = req.params
  const findTodo = todos.find((t) => t.id == id)
  res.render("show", { findTodo })
})
