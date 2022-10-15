interface Todo {
    text: string;
    completed: boolean;
}

const btn = document.getElementById("btn")! as HTMLButtonElement;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.getElementById("todolist")!;
const progres = document.getElementById("progress")! as HTMLProgressElement;

let todos: Todo[] = readTodos();
todos.forEach(createTodo);

function readTodos(): Todo[] {
    const todoJSON = localStorage.getItem("todos");
    if (todoJSON === null) return [];
    return JSON.parse(todoJSON);
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const newTodo: Todo = {
        text: input.value,
        completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    input.value = "";
    location.reload();
}

function deleteBtnFc(deleteBtn: HTMLButtonElement) {
    deleteBtn.addEventListener("click", function (e) {
        const idElement = Number(this.parentElement!.id);
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

function setProgres(): number {
    let rez: number = 0;
    const parting: number = todos.length > 1 ? 100 / todos.length : 100;
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
    } else {
        progres.style.color = "blue";
    }
}

function handleTextLine(todo: Todo): void {
    if (todo.completed) {
        document.getElementById(
            `${todos.indexOf(todo)}`
        )!.style.textDecoration = "line-through";
    } else {
        document.getElementById(
            `${todos.indexOf(todo)}`
        )!.style.textDecoration = "none";
    }
}

function createTodo(todo: Todo) {
    const newLI = document.createElement("li");
    newLI.id = String(todos.indexOf(todo));
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

    newLI.append(todo.text);
    newLI.append(checkbox);
    newLI.append(deleteBtn);
    handleProgress();
    list.append(newLI);
    handleTextLine(todo);
}
form.addEventListener("submit", handleSubmit);
