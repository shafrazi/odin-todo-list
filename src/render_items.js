import { Todo } from "./todo";
const toDos = [];
const itemsDiv = document.querySelector(".items");

const checkTask = (event) => {
  const li = event.target.parentElement;
  const todoId = parseInt(li.dataset.todoId);
  const todo = toDos.find((todo) => {
    return todo.id === todoId;
  });
  console.log(todo);
  todo.switchComplete();
  console.log(todo);
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
  ulElement.appendChild(li);
  checkbox.addEventListener("change", checkTask);
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

const clearItems = () => {
  itemsDiv.innerHTML = "";
};

export { addTask, renderItems, clearItems };
