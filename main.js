//Selectors
const task = document.querySelector(".task")
const addtask = document.querySelector(".button")
const list = document.querySelector(".list")
const clearall = document.querySelector(".Clear-All")

//Event Listeners

addtask.addEventListener("click", addTodo);
clearall.addEventListener("click", allclear);

//Functions

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
    //checking if a task already exists in storage
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
        todo.remove();
    }
}

function allclear(e){
    let item = e.target
        let x=document.querySelector(".list")
        x.innerHTML="";
    }

