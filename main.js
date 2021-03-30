//Selectors
const task = document.querySelector(".taskinput")
const addtask = document.querySelector(".button")
const list = document.querySelector(".list")
const clearall = document.querySelector(".Clear-All")

//Event Listeners
document.addEventListener("DOMContentLoaded", loadTasks);
addtask.addEventListener("click", addTodo);
clearall.addEventListener("click", allclear);


//Functions

function addTodo(Event) {

    //TODO DIV

    const todoDiv = document.createElement("div")
    todoDiv.classList.add("tasks")

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
    const item = e.target
    if (item.classList[0] === "complete") {
        const tasks = item.parentElement;
        tasks.classList.toggle("completed");
        tasks.classList.add("check");
        rlt(tasks);
       
    }
        const tasks = item.parentElement;
        sct(tasks.children[0].innerText);
    function sct(save){
        let done;
        if (localStorage.getItem("done") === null) {
            done = [];
        } else {
            done = JSON.parse(localStorage.getItem("done"));
        }
        done.push(save);
        localStorage.setItem("done", JSON.stringify(done));
     }

    //Adding boolean to local storage
    //let x=e.target
    //sct(x.classList[0]==="complete")
 
}
function clear(e) {                                      //delete tasks 
    const item = e.target
    if (item.classList[0] === "trash") {

        /*todo.classList.add("fall");
        if we add class fall here and add transition in css,the item would be deleted first and we wont get our animation.
        if we erase todo.remove() from here,it will appear like the todo has vanished when we clck the button as I have set the opacity 
        zero but it will still remain there on inspecting the code.*/

        /*SO ADDING ANIMATION  BEFORE THE FUNCTION IS THE BEST WAY TO PROCEED.*/
        const tasks = item.parentElement;
        //Animation
        tasks.classList.add("fall")
        tasks.addEventListener("transitionend", function () {
            tasks.remove()
        })

        rlt(tasks);

    }
}

function rlt(tasks) {          //rlt=remove local tasks
    let st;
    if (localStorage.getItem("st") === null) {
        st = [];
    } else {
        st = JSON.parse(localStorage.getItem("st"));
    }
    const tasksindex = tasks.children[0].innerText;
    st.splice(st.indexOf(tasksindex), 1);
    localStorage.setItem("st", JSON.stringify(st));

}

function allclear(e) {
    let item = e.target
    let x = document.querySelector(".list")
    x.innerHTML = "";
    localStorage.clear()
}

/*this function is not displaying elements from local storage but is adding an li element with no text everytime it is refreshed.

window.onload = function () {
    if (JSON.parse(localStorage.getItem("st")) != null){
        st = JSON.parse(localStorage.getItem("st"));
        addTodo(Event);
    }
}
*/

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
        todoDiv.classList.add("tasks")

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


//const a=localStorage.getItem("checked");
//if(a){
//const checks=document.querySelector(".check")
//    checks.classList.toggle("completed")
//}

//function lct(){
//    let f=localStorage.getItem("checked");
//       f.forEach(function(check){
//             //TODO DIV
//
//    const todoDiv = document.createElement("div")
//    todoDiv.classList.add("task")
//    todoDiv.classList.add("completed")
//
//    //create li
//
//    const newTask = document.createElement("li")
//    newTask.classList.add("tasklist")
//
//    /*task.value is the value in the input we will type
//    task is the constant we made at the start of the script*/
//
//    newTask.innerText = task;
//    todoDiv.appendChild(newTask);
//
//    //adding checkbox
//    const checkbox = document.createElement("button");
//    checkbox.classList.add("complete")
//    checkbox.innerHTML = '<i class="far fa-check-square"></i>';//why cant we use double quotes here....on using double quotes,we get an error.
//    todoDiv.appendChild(checkbox);
//    checkbox.addEventListener("click", check);
//
//    //adding delete button
//    const trashbtn = document.createElement("button");
//    trashbtn.classList.add("trash")
//    trashbtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
//    todoDiv.appendChild(trashbtn);
//    trashbtn.addEventListener("click", clear);
//
//    //appending to list
//    list.appendChild(todoDiv);
//       })
//
//
//    
//}
//function lct(){
//    let done;
//    if (localStorage.getItem("done") === null) {
//        done = [];
//    } else {
//        done = JSON.parse(localStorage.getItem("done"));
//    }
//    done.forEach(function (e) {
//        let item = e.target
//        if (item.classList[0] === "complete") {
//            let todo = item.parentElement;
//            todo.classList.toggle("completed");
//    }
//});
//}



//trying to remove the tasks/boolean in DONE KEY.
//function rsct(task){          //rsct=remove saved checked tasks
//    let done;
//    if (localStorage.getItem("done") === null) {
//        done = [];
//    } else {
//        done = JSON.parse(localStorage.getItem("done"));
//    }
//    const y = task.classList[0].hidden;
//    done.splice(done.indexOf(y), 1);
//    localStorage.setItem("done", JSON.stringify(done));
//}