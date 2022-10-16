"use strict";
const btn = document.getElementById("btn");
const input = document.getElementById("todoinput");
const form = document.querySelector("form");
const list = document.getElementById("todolist");
const progres = document.getElementById("progress");
let todos = readTodos();
todos.forEach(createTodo);
function readTodos() {
    const todoJSON = localStorage.getItem("todos");
    if (todoJSON === null)
        return [];
    return JSON.parse(todoJSON);
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    input.value = "";
    location.reload();
}
function deleteBtnFc(deleteBtn) {
    deleteBtn.addEventListener("click", function (e) {
        const idElement = Number(this.parentElement.id);
        const todosFiltred = todos.filter(function (todo, index) {
            if (index !== idElement) {
                return todo;
            }
        });
        todos = todosFiltred;
        saveTodos();
        location.reload();
    });
}
function setProgres() {
    let rez = 0;
    const parting = todos.length > 1 ? 100 / todos.length : 100;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].completed === true) {
            rez += parting;
        }
    }
    return rez;
}
function handleProgress() {
    progres.hidden = false;
    progres.value = setProgres();
    if (progres.value === 100) {
        progres.style.color = "green";
    }
    else {
        progres.style.color = "blue";
    }
}
function handleTextLine(todo) {
    if (todo.completed) {
        document.getElementById(`${todos.indexOf(todo)}`).children[0].innerHTML = `<del>${todo.text}</del>`;
    }
    else {
        document.getElementById(`${todos.indexOf(todo)}`).children[0].innerHTML = `${todo.text}`;
    }
}
function createTodo(todo) {
    const newLI = document.createElement("li");
    newLI.id = String(todos.indexOf(todo));
    const p = document.createElement("span");
    p.textContent = todo.text;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked;
        handleTextLine(todo);
        saveTodos();
        handleProgress();
    });
    deleteBtnFc(deleteBtn);
    newLI.append(p);
    newLI.append(checkbox);
    newLI.append(deleteBtn);
    handleProgress();
    list.append(newLI);
    handleTextLine(todo);
}
form.addEventListener("submit", handleSubmit);
