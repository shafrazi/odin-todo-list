!function(e){var t={};function n(r){if(t[r])return t[r].exports;var c=t[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(r,c,function(t){return e[t]}.bind(null,c));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class r{constructor(e,t){this.title=e,this.project=t,this.complete=!1,this.id}switchComplete(){this.complete?this.complete=!1:this.complete=!0}createTodoLi(){const e=document.createElement("li"),t=document.createElement("span"),n=document.createElement("input"),r=document.createElement("button");r.setAttribute("class","btn-secondary"),r.setAttribute("id","delete-btn"),r.innerHTML="Delete";const c=document.createElement("button");c.setAttribute("class","btn-secondary"),c.setAttribute("id","edit-btn"),c.innerHTML="Edit",n.type="checkbox",this.complete&&(n.checked=!0),n.setAttribute("class","task-check"),e.appendChild(n),t.innerHTML=this.title,t.setAttribute("class","task-title"),e.setAttribute("data-todo-id",this.id),e.setAttribute("class","task-item"),e.appendChild(t);const l=document.createElement("span");return l.setAttribute("class","task-project"),l.innerHTML=this.project,e.appendChild(l),e.appendChild(c),e.appendChild(r),e}}class c{constructor(e){this.todos=[],this.complete=!1,this.name=e,this.id}createLi(){const e=document.createElement("li"),t=document.createElement("a");return t.innerHTML=this.name[0].toUpperCase()+this.name.slice(1),t.href="#",e.appendChild(t),e.classList.add("project-item"),e.setAttribute("data-project-id",this.id),e}}const l=[],i=[],d=document.querySelector(".modal"),o=document.querySelector(".items");let s=new c("General");s.id=0,i.push(s);const a=()=>{const e=document.querySelector(".projects-ul");for(let t=0;t<i.length;t++){let n=i[t].createLi();e.appendChild(n)}},u=e=>{const t=e.target.parentElement,n=parseInt(t.dataset.todoId);return l.find(e=>e.id===n)},p=e=>{u(e).switchComplete()},m=e=>{const t=e.target.parentElement,n=u(e);for(let e=0;e<l.length;e++)l[e]===n&&l.splice(e,1);t.style.display="none"},h=(e,t)=>{const n=e.value,c=t.value,d=(e=>{const t=e.options[e.selectedIndex],n=parseInt(t.dataset.projectId);return i.find(e=>e.id===n)})(t),o=document.querySelector(".pending-todos-list");let s=new r(n,c);l.push(s),d.todos.push(s),s.id=l.length-1;const a=s.createTodoLi(),u=a.firstElementChild;o.appendChild(a),u.addEventListener("change",p),S(),f("all")},b=e=>{if(""!==e){let t=new c(e);i.push(t),t.id=i.length-1,document.querySelector(".projects-ul").innerHTML="",a()}},y=(e,t)=>{const n=e.createTodoLi(),r=n.firstElementChild,c=n.querySelector("#delete-btn"),l=n.querySelector("#edit-btn");t.appendChild(n),r.addEventListener("change",p),c.addEventListener("click",m),l.addEventListener("click",j)},f=e=>{const t=document.createElement("ul");if(t.classList.add("todos-list",e),o.appendChild(t),l.length>0)for(let n=0;n<l.length;n++){const r=l[n];"pending"===e?r.complete||y(r,t):"complete"===e?r.complete&&y(r,t):y(r,t)}},E=(e,t)=>{const n=e.querySelector("label"),r=e.querySelector("input");n.htmlFor=t,n.innerHTML=t[0].toUpperCase()+t.slice(1)+" : ",r.setAttribute("id",t)},v=()=>{const e=document.createElement("div"),t=document.createElement("div"),n=document.createElement("label"),r=document.createElement("input");e.classList.add("form"),t.classList.add("form-group"),r.type="text",t.appendChild(n),t.appendChild(r);const c=document.createElement("div"),l=document.createElement("label"),d=document.createElement("select");return l.htmlFor="project",l.innerHTML="Project : ",d.setAttribute("id","project"),c.classList.add("form-group"),c.appendChild(l),c.appendChild(d),((e,t)=>{for(let n=0;n<e.length;n++){let r=document.createElement("option");r.text=e[n].name,r.setAttribute("data-project-id",e[n].id),t.add(r)}})(i,d),E(t,"title"),e.appendChild(t),e.appendChild(c),e},L=()=>{const e=d.firstElementChild;d.removeChild(e)},C=()=>{const e=d.querySelector(".button-div");d.querySelector(".form").removeChild(e)},g=e=>{const t=document.createElement("div");t.classList.add("button-div"),t.setAttribute("data-todo-id",""+e.id);const n=document.createElement("button"),r=document.createElement("button");return n.classList.add("btn-primary","btn-item"),n.setAttribute("id","save-task-btn"),n.innerHTML="Save",n.addEventListener("click",e=>{(e=>{const t=u(e),n=e.target.parentElement.dataset.sourcePage;t.title=d.querySelector("#title").value,t.project=d.querySelector("#project").value,d.style.display="none",C(),L(),S(),f(n)})(e)}),r.classList.add("btn-primary","btn-item","delete-btn"),r.setAttribute("id","delete-task-btn"),r.innerHTML="Delete",r.addEventListener("click",()=>{}),t.appendChild(n),t.appendChild(r),t},S=()=>{o.innerHTML=""},j=e=>{const t=e.target.parentElement.parentElement,n=v(),r=t.classList[1],c=u(e),l=g(c);d.firstElementChild&&L(),d.appendChild(n),l.setAttribute("data-source-page",r),n.appendChild(l),(e=>{const t=document.querySelector(".form");t.querySelector("#title").value=e.title,t.querySelector("#project").value=e.project})(c),d.style.display="block"};var k,q=document.getElementsByClassName("accordion");for(k=0;k<q.length;k++)q[k].addEventListener("click",(function(){this.classList.toggle("active");var e=this.nextElementSibling;e.style.maxHeight?e.style.maxHeight=null:e.style.maxHeight=e.scrollHeight+"px"}));const A=document.querySelector("#all-items"),T=document.querySelector("#pending-items"),H=document.querySelector("#completed-items");a(),A.addEventListener("click",()=>{S(),f("all")}),T.addEventListener("click",()=>{S(),f("pending")}),H.addEventListener("click",()=>{S(),f("complete")});const M=document.querySelector(".modal"),x=document.querySelector("#create-todo-btn"),w=document.querySelector("#add-project-btn");x.onclick=function(){const e=v();M.appendChild(e);const t=(()=>{const e=document.createElement("div"),t=M.querySelector("#title"),n=M.querySelector("#project");e.classList.add("button-div");const r=document.createElement("button");return r.classList.add("btn-primary"),r.setAttribute("id","new-task-btn"),r.innerHTML="Add task",r.addEventListener("click",()=>{h(t,n)}),e.appendChild(r),e})();e.appendChild(t),M.style.display="block"},w.onclick=function(){const e=(()=>{const e=document.createElement("div"),t=document.createElement("div"),n=document.createElement("label"),r=document.createElement("input");return e.classList.add("form"),t.classList.add("form-group"),r.type="text",t.appendChild(n),t.appendChild(r),E(t,"name"),e.appendChild(t),e})();M.appendChild(e);const t=(()=>{const e=document.createElement("div"),t=d.querySelector("#name");e.classList.add("button-div");const n=document.createElement("button");return n.classList.add("btn-primary"),n.setAttribute("id","new-project-btn"),n.innerHTML="Add project",n.addEventListener("click",()=>{b(t.value)}),e.appendChild(n),e})();e.appendChild(t),M.style.display="block"},window.onclick=function(e){e.target==M&&(C(),L(),M.style.display="none")},window.onresize=function(){C(),L(),M.style.display="none"}}]);