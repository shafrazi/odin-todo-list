!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class o{constructor(e,t){this.title=e,this.project=t,this.complete=!1,this.id}switchComplete(){this.complete?this.complete=!1:this.complete=!0}createTodoLi(){const e=document.createElement("li"),t=document.createElement("span"),n=document.createElement("input");n.type="checkbox",n.setAttribute("class","task-check"),e.appendChild(n),t.innerHTML=this.title,e.setAttribute("data-todo-id",this.id),e.setAttribute("class","task-item"),e.appendChild(t);const o=document.createElement("span");return o.innerHTML=this.project,e.appendChild(o),e}}var r,l=document.getElementsByClassName("accordion");for(r=0;r<l.length;r++)l[r].addEventListener("click",(function(){this.classList.toggle("active");var e=this.nextElementSibling;e.style.maxHeight?e.style.maxHeight=null:e.style.maxHeight=e.scrollHeight+"px"}));const c=e=>{const t=e.target.parentElement,n=parseInt(t.dataset.todoId),o=d.find(e=>e.id===n);console.log(o),o.switchComplete(),console.log(o)},i=document.querySelector("#title"),s=document.querySelector("#project"),u=document.querySelector("#new-task-btn");let d=["hello"];u.addEventListener("click",()=>{let e=i.value,t=s.value;const n=document.querySelector(".pending-todos-list");let r=new o(e,t);d.push(r),r.id=d.length-1;const l=r.createTodoLi(),a=l.firstElementChild;n.appendChild(l),a.addEventListener("change",c)});const p=document.querySelector(".modal");document.querySelector("#create-todo-btn").onclick=function(){p.style.display="block"},window.onclick=function(e){e.target==p&&(p.style.display="none")},console.log(d),console.log(a)}]);