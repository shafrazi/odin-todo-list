import { Todo } from "./todo";
import { Project } from "./project";

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

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

const titleInput = document.querySelector("#title");
const projectInput = document.querySelector("#project");
const addTaskBtn = document.querySelector("#add-task-btn");
const toDos = [];

addTaskBtn.addEventListener("click", () => {
  let title = titleInput.value;
  let project = projectInput.value;
  const ul = document.querySelector(".pending-todos-list");

  let toDo = new Todo(title, project);
  toDos.push(toDo);
  toDo.id = toDos.length - 1;
  const li = toDo.createTodoLi();
  const checkbox = li.firstElementChild;
  ul.appendChild(li);
  checkbox.addEventListener("change", checkTask);
});
