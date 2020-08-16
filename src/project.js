class Project {
  constructor(name) {
    this.todos = [];
    this.complete = false;
    this.name = name;
    this.id;
  }

  createLi() {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerHTML = this.name[0].toUpperCase() + this.name.slice(1);
    a.href = "#";
    li.appendChild(a);
    li.classList.add("project-item");
    li.setAttribute("data-project-id", this.id);

    return li;
  }
}

export { Project };
