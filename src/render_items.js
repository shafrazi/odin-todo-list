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
  ul.setAttribute("class", "todos-list");
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

const removeModalButtons = () => {
  const buttonsDiv = modal.querySelector(".button-div");
  const todoForm = modal.querySelector(".new-todo-form");
  todoForm.removeChild(buttonsDiv);
};

const saveTask = (event) => {
  const todo = getTodoFromElement(event);
  todo.title = modal.querySelector("#title").value;
  todo.project = modal.querySelector("#project").value;
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

  deleteTaskBtn.classList.add("btn-primary", "btn-item");
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
  const todo = getTodoFromElement(event);
  const buttonsDiv = generateEditTaskButtons(todo);
  form.appendChild(buttonsDiv);
  populateForm(todo);
  modal.style.display = "block";
};

export { addTask, renderItems, clearItems, removeModalButtons };
