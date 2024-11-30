const allTodos = document.querySelectorAll(".list-group-item")

for (let item of allTodos) {
  if (item.classList.contains("Normal")) {
    item.classList.add("list-group-item-info")
  } else if (item.classList.contains("Important")) {
    item.classList.add("list-group-item-warning")
  } else if (item.classList.contains("Urgent")) {
    item.classList.add("list-group-item-danger")
  }
}
