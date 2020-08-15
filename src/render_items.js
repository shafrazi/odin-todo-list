import { Todo } from "./todo";

const toDos = [];
const modal = document.querySelector(".modal");
const form = modal.querySelector(".new-todo-form");
const itemsDiv = document.querySelector(".items");

const getTodoFromElement = (event) => {
  const parent = event.target.parentElement;
  const todoId = parseInt(parent.dataset.todoId);
  const todo = toDos.find((todo) => {
    return todo.id === todoId;
  });
  return todo;
};

const checkTask = (event) => {
  const todo = getTodoFromElement(event);
  todo.switchComplete();
};

const deleteTask = (event) => {
  const li = event.target.parentElement;
  const todo = getTodoFromElement(event);

  for (let i = 0; i < toDos.length; i++) {
    if (toDos[i] === todo) {
      toDos.splice(i, 1);
    }
  }
  li.style.display = "none";
};

const addTask = (title, project) => {
  const ul = document.querySelector(".pending-todos-list");

  let toDo = new Todo(title, project);
  toDos.push(toDo);
  toDo.id = toDos.length - 1;
  const li = toDo.createTodoLi();
  const checkbox = li.firstElementChild;
  ul.appendChild(li);
  checkbox.addEventListener("change", checkTask);
  clearItems();
  renderItems("all");
};

const createLi = (toDo, ulElement) => {
  const li = toDo.createTodoLi();
  const checkbox = li.firstElementChild;
  const deleteButton = li.querySelector("#delete-btn");
  const editButton = li.querySelector("#edit-btn");
  ulElement.appendChild(li);
  checkbox.addEventListener("change", checkTask);
  deleteButton.addEventListener("click", deleteTask);
  editButton.addEventListener("click", editTask);
};

const renderItems = (type) => {
  const ul = document.createElement("ul");
  ul.classList.add("todos-list", type);
  itemsDiv.appendChild(ul);
  if (toDos.length > 0) {
    for (let i = 0; i < toDos.length; i++) {
      const toDo = toDos[i];
      if (type === "pending") {
        if (!toDo.complete) {
          createLi(toDo, ul);
        }
      } else if (type === "complete") {
        if (toDo.complete) {
          createLi(toDo, ul);
        }
      } else {
        createLi(toDo, ul);
      }
    }
  }
};

const setFormElementAttributes = (div, field) => {
  const label = div.querySelector("label");
  const input = div.querySelector("input");
  label.htmlFor = field;
  label.innerHTML = `${field[0].toUpperCase() + field.slice(1)} : `;
  input.setAttribute("id", field);
};

const generateTodoFormDiv = () => {
  const div = document.createElement("div");
  const formGroupTitle = document.createElement("div");
  const labelTitle = document.createElement("label");
  const inputTitle = document.createElement("input");
  div.classList.add("todo-form");
  formGroupTitle.classList.add("form-group");
  inputTitle.type = "text";
  formGroupTitle.appendChild(labelTitle);
  formGroupTitle.appendChild(inputTitle);

  const formGroupProject = formGroupTitle.cloneNode(true);
  setFormElementAttributes(formGroupTitle, "title");
  setFormElementAttributes(formGroupProject, "project");
  div.appendChild(formGroupTitle);
  div.appendChild(formGroupProject);
  return div;
};

const removeModalButtons = () => {
  const buttonsDiv = modal.querySelector(".button-div");
  const todoForm = modal.querySelector(".new-todo-form");
  todoForm.removeChild(buttonsDiv);
};

const saveTask = (event) => {
  const todo = getTodoFromElement(event);
  const sourcePage = event.target.parentElement.dataset.sourcePage;
  todo.title = modal.querySelector("#title").value;
  todo.project = modal.querySelector("#project").value;
  modal.style.display = "none";
  removeModalButtons();
  clearItems();
  renderItems(sourcePage);
};

const generateEditTaskButtons = (todo) => {
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("button-div");
  buttonsDiv.setAttribute("data-todo-id", `${todo.id}`);
  const saveTaskBtn = document.createElement("button");
  const deleteTaskBtn = document.createElement("button");

  saveTaskBtn.classList.add("btn-primary", "btn-item");
  saveTaskBtn.setAttribute("id", "save-task-btn");
  saveTaskBtn.innerHTML = "Save";
  saveTaskBtn.addEventListener("click", (event) => {
    saveTask(event);
  });

  deleteTaskBtn.classList.add("btn-primary", "btn-item", "delete-btn");
  deleteTaskBtn.setAttribute("id", "delete-task-btn");
  deleteTaskBtn.innerHTML = "Delete";
  deleteTaskBtn.addEventListener("click", () => {});
  buttonsDiv.appendChild(saveTaskBtn);
  buttonsDiv.appendChild(deleteTaskBtn);
  return buttonsDiv;
};

const clearItems = () => {
  itemsDiv.innerHTML = "";
};

const populateForm = (todo) => {
  form.querySelector("#title").value = todo.title;
  form.querySelector("#project").value = todo.project;
};

const editTask = (event) => {
  const ul = event.target.parentElement.parentElement;
  const page = ul.classList[1];
  const todo = getTodoFromElement(event);
  const buttonsDiv = generateEditTaskButtons(todo);
  buttonsDiv.setAttribute("data-source-page", page);
  form.appendChild(buttonsDiv);
  populateForm(todo);
  modal.style.display = "block";
};

export {
  addTask,
  renderItems,
  clearItems,
  removeModalButtons,
  generateTodoFormDiv,
};
