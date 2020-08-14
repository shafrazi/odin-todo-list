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

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "btn-secondary");
    deleteButton.setAttribute("id", "delete-btn");
    deleteButton.innerHTML = "Delete";

    const editButton = document.createElement("button");
    editButton.setAttribute("class", "btn-secondary");
    editButton.setAttribute("id", "edit-btn");
    editButton.innerHTML = "Edit";

    checkbox.type = "checkbox";
    if (this.complete) {
      checkbox.checked = true;
    }
    checkbox.setAttribute("class", "task-check");
    li.appendChild(checkbox);

    titleSpan.innerHTML = this.title;
    titleSpan.setAttribute("class", "task-title");

    li.setAttribute("data-todo-id", this.id);
    li.setAttribute("class", "task-item");
    li.appendChild(titleSpan);
    const projectSpan = document.createElement("span");
    projectSpan.setAttribute("class", "task-project");
    projectSpan.innerHTML = this.project;
    li.appendChild(projectSpan);

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    return li;
  }
}

export { Todo };
