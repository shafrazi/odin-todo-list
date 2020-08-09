import { addTask, renderItems, clearItems } from "./render_items";

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

const titleInput = document.querySelector("#title");
const projectInput = document.querySelector("#project");
const addTaskBtn = document.querySelector("#new-task-btn");
const allItems = document.querySelector("#all-items");
const pendingItems = document.querySelector("#pending-items");
const completedItems = document.querySelector("#completed-items");

addTaskBtn.addEventListener("click", () => {
  addTask(titleInput.value, projectInput.value);
});

allItems.addEventListener("click", () => {
  clearItems();
  renderItems("all");
});

pendingItems.addEventListener("click", () => {
  clearItems();
  renderItems("pending");
});

completedItems.addEventListener("click", () => {
  clearItems();
  renderItems("complete");
});

// create new task modal

const modal = document.querySelector(".modal");
const createTaskBtn = document.querySelector("#create-todo-btn");

createTaskBtn.onclick = function () {
  modal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
