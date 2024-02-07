//Setup or retrieve array on local storage
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".button");
const deleteButton = document.getElementById("deleteButton")


//Program
document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function(event){
        if (event.key==="Enter"){
            event.preventDefault();
            addTask();
        }
    })
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
})

function addTask(){
    const newTask = todoInput.value.trim()
    if(newTask !== ""){
        todo.push({
            text: newTask, 
            disabled: false,
            priority: "3",
        })
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
    }
}

function displayTasks(){
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
        <div class = "todo-container">
            <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
            <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTaskName(${index})">${item.text}
            </p>
        </div>  
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });
        const l = document.createElement("l");
        l.innerHTML=`
        <select name="priorities" id="pri-${index}">
            <option selected = "def">Priority</option>
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
        </select>
        <l id="select-${index} onclick="editTaskPri(${index})"></l>
        `;
        l.addEventListener("change", () => {
            editTaskPri(index)
        } )
        todoList.appendChild(p);
        todoList.appendChild(l)
    });
    todoCount.textContent = todo.length;
}

function editTaskPri(index){
    const todoItem = document.getElementById(`todo-${index}`);
    const pri = document.getElementById(`pri-${index}`);
    const value = pri.value;
    todo[index].priority = value;
    saveToLocalStorage();
    displayTasks();
}

function editTaskName(index){
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");
    
    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const newItem = inputElement.value.trim();
        if (newItem){
            todo[index].text = newItem;
            saveToLocalStorage();
            displayTasks();
        }
    });
}

function toggleTask(index){
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteAllTasks(){
    todo = [];
    saveToLocalStorage();
    displayTasks();
}

function saveToLocalStorage(){
    localStorage.setItem("todo", JSON.stringify(todo));
}