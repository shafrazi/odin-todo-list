class Todo {
  constructor(title, project) {
    this.title = title;
    this.project = project;
    this.complete = false;
    this.id;
  }

  switchComplete() {
    if (this.complete) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }

  createTodoLi() {
    const li = document.createElement("li");
    const titleSpan = document.createElement("span");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    if (this.complete) {
      checkbox.checked = true;
    }
    checkbox.setAttribute("class", "task-check");
    li.appendChild(checkbox);
    titleSpan.innerHTML = this.title;
    li.setAttribute("data-todo-id", this.id);
    li.setAttribute("class", "task-item");
    li.appendChild(titleSpan);
    const projectSpan = document.createElement("span");
    projectSpan.innerHTML = this.project;
    li.appendChild(projectSpan);
    return li;
  }
}

export { Todo };
