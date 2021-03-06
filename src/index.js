import {
  addTask,
  renderItems,
  clearItems,
  removeModalButtons,
  generateTodoFormDiv,
  clearForm,
  generateProjectFormDiv,
  generateProjectNewBtn,
  renderProjects,
  displayTitle,
} from "./render_items";

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

const allItems = document.querySelector("#all-items");
const pendingItems = document.querySelector("#pending-items");
const completedItems = document.querySelector("#completed-items");

renderProjects();

allItems.addEventListener("click", () => {
  clearItems();
  renderItems("all");
  displayTitle(event);
});

pendingItems.addEventListener("click", () => {
  clearItems();
  renderItems("pending");
  displayTitle(event);
});

completedItems.addEventListener("click", () => {
  clearItems();
  renderItems("complete");
  displayTitle(event);
});

// create new task modal

const modal = document.querySelector(".modal");
const createTaskBtn = document.querySelector("#create-todo-btn");
const addProjectBtn = document.querySelector("#add-project-btn");

const generateAddTaskBtn = () => {
  const buttonsDiv = document.createElement("div");
  const titleInput = modal.querySelector("#title");
  const projectInput = modal.querySelector("#project");

  buttonsDiv.classList.add("button-div");
  const newTaskBtn = document.createElement("button");
  newTaskBtn.classList.add("btn-primary");
  newTaskBtn.setAttribute("id", "new-task-btn");
  newTaskBtn.innerHTML = "Add task";
  newTaskBtn.addEventListener("click", () => {
    addTask(titleInput, projectInput);
  });
  buttonsDiv.appendChild(newTaskBtn);
  return buttonsDiv;
};

createTaskBtn.onclick = function () {
  const form = generateTodoFormDiv();
  modal.appendChild(form);
  const buttonsDiv = generateAddTaskBtn();
  form.appendChild(buttonsDiv);
  modal.style.display = "block";
};

addProjectBtn.onclick = function () {
  const form = generateProjectFormDiv();
  modal.appendChild(form);
  const buttonsDiv = generateProjectNewBtn();
  form.appendChild(buttonsDiv);
  modal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == modal) {
    removeModalButtons();
    clearForm();
    modal.style.display = "none";
  }
};

window.onresize = function () {
  if (document.querySelector(".form")) {
    removeModalButtons();
    clearForm();
  }
  modal.style.display = "none";
};
