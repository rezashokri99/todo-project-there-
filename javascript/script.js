// access //

// access inputTodo
let inputTodo = document.querySelector("#input-add-todo");
// access btn save todo
let btnSaveTodo = document.querySelector("#btn-add-todo");
// access todo container
let todoContainer = document.querySelector(".todos");
// access btn delete todo
let deleteTodo;




// listeners //

// listener load page 
addEventListener("DOMContentLoaded", loadTodoFn);
// listener btn save todo
btnSaveTodo.addEventListener("click", saveTodoFn);




// functions //

// get todos of localStorage function
function getTodosOfLocalStorage() {
    // get todos of LS
    let getLocalStorage = JSON.parse(localStorage.getItem("todos"));
    
    let todos;

    // if get todos isn't null
    if (getLocalStorage) {
        todos = [...getLocalStorage];
    // if get todos is null
    }else{
        todos= [];
    }

    return todos;
}

// loadTodoFn when load page
function loadTodoFn() {
    // todos of Ls
    let todos = getTodosOfLocalStorage();

    let list = [];

    // loop on todos
    todos.forEach((item, index) => {

        // build todo 
        let todo = `
            <li class="todo" data-id="${index + 1}">${item[0]}<span class="delete-todo">X</span></li>
        `

        // add todo to ui
        todoContainer.innerHTML += todo;
        
        // update todos
        list.push([item[0], index + 1])
    })

    // add new todos to LS
    localStorage.setItem("todos", JSON.stringify(list))

    // access to all btn delete todo
    deleteTodo = document.querySelectorAll(".delete-todo");

    // loop on btns delete todo
    deleteTodo.forEach((item) => {

        // add listener on every delete todo
        item.addEventListener("click", deleteTodoFn);
    })
}


function saveTodoFn() {

    // todos of LS
    let todos = getTodosOfLocalStorage();

    // add new todo to todos
    todos.push([inputTodo.value, todos.length + 1]);

    // add todos to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));

    // build new todo
    let todo = `
        <li class="todo" data-id="${todos.length}">${inputTodo.value}<span class="delete-todo">X</span></li>
    `

    // add todo to ui
    todoContainer.innerHTML += todo;

    // access to all btn delete todo
    deleteTodo = document.querySelectorAll(".delete-todo");
    
    // loop on btns delete todo
    deleteTodo.forEach((item) => {

        // add listener on every delete todo
        item.addEventListener("click", deleteTodoFn);
    })
}


function deleteTodoFn(e) {

    // todos of LS
    let todos = getTodosOfLocalStorage();

    // access to event target parent
    let eventTodo = e.target.parentElement;

    // loop on todos
    todos.forEach((item, index) => {
        // if event target data-id == item[1]
        if (item[1] == eventTodo.dataset.id) {
            
            // delete event target of todos
            todos.splice(index, 1);
        }
    })
    // add new todos to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));

    // do null todoContainer 
    todoContainer.innerHTML = "";

    // call loadTodoFn
    loadTodoFn();
}