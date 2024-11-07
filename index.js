const express = require("express")
const app = express()
const port = 3000
const path = require("path")
const bodyParser = require("body-parser")
const moment = require("moment")
const { v4: uuidv4 } = require("uuid")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())

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

app.get("/new", (req, res) => {
  res.render("new")
})

app.get("/:id", (req, res) => {
  const { id } = req.params
  const findTodo = todos.find((t) => t.id == id)
  if (findTodo) {
    res.render("show", { findTodo })
  }
})

app.post("/", (req, res) => {
  const { task, due, importance } = req.body
  if (task) {
    todos.push({
      id: uuidv4(),
      task: task,
      due: moment(due).format("DD-MM-YYYY"),
      importance: importance,
    })
    res.redirect("/")
  } else {
    res.render("new")
  }
})
