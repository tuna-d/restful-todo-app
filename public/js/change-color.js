const allTodos = document.querySelectorAll(".list-group-item")

for (let item of allTodos) {
  if (item.classList.contains("normal")) {
    item.classList.add("list-group-item-info")
  } else if (item.classList.contains("important")) {
    item.classList.add("list-group-item-warning")
  } else if (item.classList.contains("urgent")) {
    item.classList.add("list-group-item-danger")
  }
}
