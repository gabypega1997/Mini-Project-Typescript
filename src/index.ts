interface Todo {
    text: string;
    completed: boolean;
}

const btn = document.getElementById("btn")! as HTMLButtonElement;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.getElementById("todolist")!;

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
}

function deleteTodo(todo: Todo) {}

function createTodo(todo: Todo) {
    const newLI = document.createElement("li");
    newLI.id = String(todos.indexOf(todo));
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    const add = document.createElement("button");
    add.textContent = "Add subtasks";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked;
        saveTodos();
    });

    deleteBtn.addEventListener("click", function (e) {
        const idElement = Number(this.parentElement!.id);
        const todosFiltred = todos.filter(function (todo, index) {
            if (index !== idElement) {
                return todo;
            }
        });
        todos = todosFiltred;
        saveTodos();
        
    });

    newLI.append(todo.text);
    newLI.append(checkbox);
    newLI.append(deleteBtn);
    newLI.append(add);

    list.append(newLI);
}
form.addEventListener("submit", handleSubmit);
