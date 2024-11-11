const express = require("express")
const methodOverride = require("method-override")
const app = express()
const port = 3000
const path = require("path")
const bodyParser = require("body-parser")
const moment = require("moment")
const { v4: uuidv4 } = require("uuid")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.use(methodOverride("_method"))

app.use(express.static(path.join(__dirname, "public")))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

let todos = [
  {
    id: uuidv4(),
    task: "You can create and edit tasks.",
    due: "24.03.2024",
    importance: "normal",
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

app.get("/:id/edit", (req, res) => {
  const { id } = req.params
  const findTodo = todos.find((t) => t.id == id)
  const valueDue = moment(findTodo.due, "DD.MM.YYYY").format("YYYY.MM.DD")
  res.render("edit", { findTodo, valueDue })
})

app.post("/", (req, res) => {
  const { task, due, importance } = req.body
  if (task && due) {
    todos.push({
      id: uuidv4(),
      task: task,
      due: moment(due).format("DD.MM.YYYY"),
      importance: importance,
    })
    res.redirect("/")
  } else if (task) {
    todos.push({
      id: uuidv4(),
      task: task,
      importance: importance,
    })
  } else {
    res.render("new")
  }
})

app.patch("/:id", (req, res) => {
  const { editTask, editDue, editImportance } = req.body
  const { id } = req.params
  const findTodo = todos.find((t) => t.id == id)
  findTodo.task = editTask
  editDue ? findTodo.due = moment(editDue).format("DD.MM.YYYY") : findTodo.due = ""
  findTodo.importance = editImportance
  res.redirect("/")
})

app.delete("/:id", (req, res) => {
  const { id } = req.params
  todos = todos.filter((t) => t.id != id)
  res.redirect("/")
})
