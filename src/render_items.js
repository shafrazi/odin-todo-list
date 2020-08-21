import { Todo } from "./todo";
import { Project } from "./project";

const toDos = [];
const projects = [];
const modal = document.querySelector(".modal");
const itemsDiv = document.querySelector(".items");

let defaultProject = new Project("General");
defaultProject.id = 0;
projects.push(defaultProject);

const renderProjects = () => {
  const ul = document.querySelector(".projects-ul");
  for (let i = 0; i < projects.length; i++) {
    let project = projects[i];
    let li = project.createLi();
    ul.appendChild(li);
  }
};

const clearProjects = () => {
  const ul = document.querySelector(".projects-ul");
  ul.innerHTML = "";
};

const getTodoFromElement = (event) => {
  const parent = event.target.parentElement;
  const todoId = parseInt(parent.dataset.todoId);
  const todo = toDos.find((todo) => {
    return todo.id === todoId;
  });
  return todo;
};

const getProjectFromOption = (projectElement) => {
  const option = projectElement.options[projectElement.selectedIndex];
  const projectId = parseInt(option.dataset.projectId);
  const project = projects.find((project) => {
    return project.id === projectId;
  });

  return project;
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

const addTask = (titleElement, projectElement) => {
  const title = titleElement.value;
  const projectText = projectElement.value;
  const project = getProjectFromOption(projectElement);
  const ul = document.querySelector(".pending-todos-list");

  let toDo = new Todo(title, projectText);
  toDos.push(toDo);
  project.todos.push(toDo);
  toDo.id = toDos.length - 1;

  const li = toDo.createTodoLi();
  const checkbox = li.firstElementChild;
  ul.appendChild(li);
  checkbox.addEventListener("change", checkTask);
  clearItems();
  renderItems("all");
  console.log(project.todos);
};

const addProject = (projectName) => {
  if (projectName !== "") {
    let project = new Project(projectName);
    projects.push(project);
    project.id = projects.length - 1;

    clearProjects();
    renderProjects();
  }
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

const populateSelectField = (projects, field) => {
  for (let i = 0; i < projects.length; i++) {
    let option = document.createElement("option");
    option.text = projects[i].name;
    option.setAttribute("data-project-id", projects[i].id);
    field.add(option);
  }
};

const generateTodoFormDiv = () => {
  const div = document.createElement("div");
  const formGroupTitle = document.createElement("div");
  const labelTitle = document.createElement("label");
  const inputTitle = document.createElement("input");
  div.classList.add("form");
  formGroupTitle.classList.add("form-group");
  inputTitle.type = "text";
  formGroupTitle.appendChild(labelTitle);
  formGroupTitle.appendChild(inputTitle);

  // const formGroupProject = formGroupTitle.cloneNode(true);
  const formGroupProject = document.createElement("div");
  const labelProject = document.createElement("label");
  const selectProject = document.createElement("select");
  labelProject.htmlFor = "project";
  labelProject.innerHTML = "Project : ";
  selectProject.setAttribute("id", "project");
  formGroupProject.classList.add("form-group");
  formGroupProject.appendChild(labelProject);
  formGroupProject.appendChild(selectProject);
  populateSelectField(projects, selectProject);

  setFormElementAttributes(formGroupTitle, "title");
  // setFormElementAttributes(formGroupProject, "project");
  div.appendChild(formGroupTitle);
  div.appendChild(formGroupProject);
  return div;
};

const generateProjectFormDiv = () => {
  const div = document.createElement("div");
  const formGroupProject = document.createElement("div");
  const labelName = document.createElement("label");
  const inputName = document.createElement("input");
  div.classList.add("form");
  formGroupProject.classList.add("form-group");
  inputName.type = "text";
  formGroupProject.appendChild(labelName);
  formGroupProject.appendChild(inputName);

  setFormElementAttributes(formGroupProject, "name");

  div.appendChild(formGroupProject);

  return div;
};

const clearForm = () => {
  const formElement = modal.firstElementChild;
  modal.removeChild(formElement);
};

const removeModalButtons = () => {
  const buttonsDiv = modal.querySelector(".button-div");
  const form = modal.querySelector(".form");
  form.removeChild(buttonsDiv);
};

const saveTask = (event) => {
  const todo = getTodoFromElement(event);
  const sourcePage = event.target.parentElement.dataset.sourcePage;
  todo.title = modal.querySelector("#title").value;
  todo.project = modal.querySelector("#project").value;
  modal.style.display = "none";
  removeModalButtons();
  clearForm();
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

const generateProjectNewBtn = () => {
  const buttonsDiv = document.createElement("div");
  const projectNameInput = modal.querySelector("#name");

  buttonsDiv.classList.add("button-div");
  const newProjectBtn = document.createElement("button");
  newProjectBtn.classList.add("btn-primary");
  newProjectBtn.setAttribute("id", "new-project-btn");
  newProjectBtn.innerHTML = "Add project";
  newProjectBtn.addEventListener("click", () => {
    addProject(projectNameInput.value);
  });
  buttonsDiv.appendChild(newProjectBtn);
  return buttonsDiv;
};

const clearItems = () => {
  itemsDiv.innerHTML = "";
};

const populateForm = (todo) => {
  const form = document.querySelector(".form");
  form.querySelector("#title").value = todo.title;
  form.querySelector("#project").value = todo.project;
};

const editTask = (event) => {
  const ul = event.target.parentElement.parentElement;
  const form = generateTodoFormDiv();
  const page = ul.classList[1];
  const todo = getTodoFromElement(event);
  const buttonsDiv = generateEditTaskButtons(todo);
  if (modal.firstElementChild) {
    clearForm();
  }
  modal.appendChild(form);
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
  clearForm,
  generateProjectFormDiv,
  generateProjectNewBtn,
  renderProjects,
};
