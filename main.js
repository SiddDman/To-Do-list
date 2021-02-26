//Selectors
const task = document.querySelector(".task")
const addtask = document.querySelector(".button")
const list = document.querySelector(".list")

//Event Listeners

addtask.addEventListener("click", addTodo);

//Functions

function addTodo(Event) {

    //TODO DIV

    const todoDiv = document.createElement("div")

    //create li

    const newTask = document.createElement("li")

    /*task.value is the value in the input we will type
    task is the constant we made at the start of the script
    */

    newTask.innerText = task.value;           //why if v is capital in value,the o/p is undefined ?????
    todoDiv.appendChild(newTask);

    //adding checkbox
    const checkbox = document.createElement("button");
    checkbox.innerHTML = '<i class="far fa-check-square"></i>';//why cant we use double quotes here....on using double quotes,we get an error.
    todoDiv.appendChild(checkbox);
    //adding delete button
    const trashbtn = document.createElement("button");
    trashbtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    todoDiv.appendChild(trashbtn);
    //appending to list
    list.appendChild(todoDiv);
    //clear task input ie after pressing add button,text in input fld. will be cleared
    task.value = "";
}

