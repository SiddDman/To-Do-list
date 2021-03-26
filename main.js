//Selectors
const task = document.querySelector(".task")
const addtask = document.querySelector(".button")
const list = document.querySelector(".list")
const clearall = document.querySelector(".Clear-All")

//Event Listeners
document.addEventListener("DOMContentLoaded", loadTasks);
addtask.addEventListener("click", addTodo);
clearall.addEventListener("click", allclear);
task.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        addTodo(Event)
    }
}
);

//Functions
/*this function is not displaying elements from local storage but is adding an li element with no text everytime it is refreshed.

window.onload = function () {
    if (JSON.parse(localStorage.getItem("st")) != null){
        st = JSON.parse(localStorage.getItem("st"));
        addTodo(Event);
    }
}
*/

function addTodo(Event) {

    //TODO DIV

    const todoDiv = document.createElement("div")
    todoDiv.classList.add("task")

    //create li

    const newTask = document.createElement("li")
    newTask.classList.add("tasklist")

    /*task.value is the value in the input we will type
    task is the constant we made at the start of the script*/

    newTask.innerText = task.value;
    todoDiv.appendChild(newTask);

    //add Task to local storage
    saveLocalTasks(task.value);

    //adding checkbox
    const checkbox = document.createElement("button");
    checkbox.classList.add("complete")
    checkbox.innerHTML = '<i class="far fa-check-square"></i>';//why cant we use double quotes here....on using double quotes,we get an error.
    todoDiv.appendChild(checkbox);
    checkbox.addEventListener("click", check);

    //adding delete button
    const trashbtn = document.createElement("button");
    trashbtn.classList.add("trash")
    trashbtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    todoDiv.appendChild(trashbtn);
    trashbtn.addEventListener("click", clear);

    //appending to list
    list.appendChild(todoDiv);

    //clear task input ie after pressing add button,text in input fld. will be cleared
    task.value = "";
}

function saveLocalTasks(save) {
    //checking if a task already exists in storage;st=savetasks
    let st;
    if (localStorage.getItem("st") === null) {
        st = [];
    } else {
        st = JSON.parse(localStorage.getItem("st"));
    }
    st.push(save);
    localStorage.setItem("st", JSON.stringify(st));
}

function check(e) {                                      //checking task
    let item = e.target
    if (item.classList[0] === "complete") {
        let todo = item.parentElement;
        todo.classList.toggle("completed")
        
    }
}

function clear(e) {                                      //delete tasks 
    let item = e.target
    if (item.classList[0] === "trash") {
        let todo = item.parentElement;
        rlt(task);
        todo.remove();
    }
}

function allclear(e) {
    let item = e.target
    let x = document.querySelector(".list")
    x.innerHTML = "";
    localStorage.clear()
}

function loadTasks() {     //saving content and displaying it when popup reloads
    let st;
    if (localStorage.getItem("st") === null) {
        st = [];
    } else {
        st = JSON.parse(localStorage.getItem("st"));
    }
    st.forEach(function (task) {
        //TODO DIV

        const todoDiv = document.createElement("div")
        todoDiv.classList.add("task")

        //create li

        const newTask = document.createElement("li")
        newTask.classList.add("tasklist")

        /*task.value is the value in the input we will type
        task is the constant we made at the start of the script*/

        newTask.innerText = task;
        todoDiv.appendChild(newTask);

        //adding checkbox
        const checkbox = document.createElement("button");
        checkbox.classList.add("complete")
        checkbox.innerHTML = '<i class="far fa-check-square"></i>';//why cant we use double quotes here....on using double quotes,we get an error.
        todoDiv.appendChild(checkbox);
        checkbox.addEventListener("click", check);

        //adding delete button
        const trashbtn = document.createElement("button");
        trashbtn.classList.add("trash")
        trashbtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        todoDiv.appendChild(trashbtn);
        trashbtn.addEventListener("click", clear);

        //appending to list
        list.appendChild(todoDiv);
    });
}

function rlt(task) {          //rlt=remove local tasks
    let st;
    if (localStorage.getItem("st") === null) {
        st = [];
    } else {
        st = JSON.parse(localStorage.getItem("st"));
    }
    const taskIndex = task.classList[0].innerText;
    st.splice(st.indexOf(taskIndex), 1);
    localStorage.setItem("st", JSON.stringify(st));

}

//working in new pc