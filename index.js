const express = require("express")
const methodOverride = require("method-override")
const app = express()
const port = 3000
const path = require("path")
const bodyParser = require("body-parser")
const moment = require("moment")
const mongoose = require("mongoose")
const Todo = require("./models/todo")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, "public")))

mongoose
  .connect("mongodb://127.0.0.1:27017/todoApp")
  .then(() => {
    console.log("connected to the database")
  })
  .catch((err) => {
    console.log("ERROR", err)
  })

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

const importanceCat = ["Normal", "Important", "Urgent"]

app.get("/", async (req, res) => {
  try {
    const todos = await Todo.find()
    res.render("home", { todos })
  } catch (error) {
    console.error("Error fetching todos:", error)
    res.status(500).send("Internal Server Error")
  }
})

app.get("/new", (req, res) => {
  try {
    res.render("new", { importanceCat })
  } catch (error) {
    console.error("Error rendering new todo form:", error)
    res.status(500).send("Internal Server Error")
  }
})

app.post("/", async (req, res) => {
  try {
    const { task, due, importance } = req.body

    if (task && due) {
      const newTodo = new Todo({
        task: task,
        due: moment(due).format("DD.MM.YYYY"),
        importance: importance,
      })
      await newTodo.save()
      res.redirect("/")
    } else if (task) {
      const newTodo = new Todo({
        task: task,
        importance: importance,
      })
      await newTodo.save()
      res.redirect("/")
    } else {
      res.render("new", { importanceCat })
    }
  } catch (error) {
    console.error("Error creating new todo:", error)
    res.status(500).send("Internal Server Error")
  }
})

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const findTodo = await Todo.findById(id)

    if (findTodo) {
      res.render("show", { findTodo })
    } else {
      res.status(404).send("Todo not found")
    }
  } catch (error) {
    console.error("Error fetching todo by ID:", error)
    res.status(500).send("Internal Server Error")
  }
})

app.get("/:id/edit", async (req, res) => {
  try {
    const { id } = req.params
    const findTodo = await Todo.findById(id)

    if (findTodo) {
      const valueDue = moment(findTodo.due, "DD.MM.YYYY").format("YYYY-MM-DD")
      res.render("edit", { findTodo, valueDue, importanceCat })
    } else {
      res.status(404).send("Todo not found")
    }
  } catch (error) {
    console.error("Error fetching todo for edit:", error)
    res.status(500).send("Internal Server Error")
  }
})

app.put("/:id", async (req, res) => {
  try {
    const { editTask, editDue, editImportance } = req.body
    const { id } = req.params
    const due = editDue ? moment(editDue).format("DD.MM.YYYY") : ""

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        task: editTask,
        due: due,
        importance: editImportance,
      },
      { runValidators: true, new: true }
    )

    if (updatedTodo) {
      res.redirect("/")
    } else {
      res.status(404).send("Todo not found")
    }
  } catch (error) {
    console.error("Error updating todo:", error)
    res.status(500).send("Internal Server Error")
  }
})

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deletedTodo = await Todo.findByIdAndDelete(id)

    if (deletedTodo) {
      res.redirect("/")
    } else {
      res.status(404).send("Todo not found")
    }
  } catch (error) {
    console.error("Error deleting todo:", error)
    res.status(500).send("Internal Server Error")
  }
})
