//Selectors
const task = document.querySelector(".taskinput")
const addtask = document.querySelector(".button")
const list = document.querySelector(".list")
const clearall = document.querySelector(".Clear-All")

//Event Listeners
document.addEventListener("DOMContentLoaded", loadTasks);
document.addEventListener("DOMContentLoaded", lct);
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

function saveLocalTasks(save) {                      //saving task to localstorage(key=st)

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
        const trash = tasks.children[2];
        /*Here I cant toggle the class or else the clear function will not work properly as by toggling,a class is added to the element.Here my 
        need is to replace class TRASH with CHECK so my if else ladder can run properly.*/ 

        trash.classList.remove("trash");
        trash.classList.add("check")

        const box=tasks.children[1];
        box.classList.remove("complete");
        box.classList.add("strike")

        rlt(tasks);

        /*rlt(tasks) function here removes the selected task from the st(save tasks) localstorage key and sct(save) adds that task to 
        localstorage key done which I made to store all checked/completed tasks.*/ 

    }
    const tasks = item.parentElement;
    sct(tasks.children[0].innerText);
    function sct(save) {
        let done;
        if (localStorage.getItem("done") === null) {
            done = [];
        } else {
            done = JSON.parse(localStorage.getItem("done"));
        }
        done.push(save);
        localStorage.setItem("done", JSON.stringify(done));
    }
    //Instead of text,first I tried to assign boolean values to the checked tasks and save boolean values in localstorage but I dropped the idea
    //because it was too complicated and I couldnt find resources that would help me in this.
    //Adding boolean to local storage
    //let x=e.target
    //sct(x.classList[0]==="complete")

}

function clear(e) {                                      //delete tasks 
    const item = e.target

    /*I am using an if-else ladder to delete tasks from page and localstorage simultaneously.If class of delete/trashbtn is trash,then task
    is unchecked and is in localstorage key st.if the class is check,then the task is checked andis in localstorage key done.*/ 

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
        });

        rlt(tasks);

    }else if(item.classList[0] === "check") {
        const tasks = item.parentElement;
        tasks.classList.add("fall")
        tasks.addEventListener("transitionend", function () {
            tasks.remove()
        });
        rsct(tasks) ;
    }
}



function rlt(tasks) {          //rlt=remove local tasks(unchecked)

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

function rsct(tasks) {          //rsct=remove saved checked tasks
    let done;
    if (localStorage.getItem("done") === null) {
        done = [];
    } else {
        done = JSON.parse(localStorage.getItem("done"));
    }
    const tasksindex = tasks.children[0].innerText;
    done.splice(done.indexOf(tasksindex), 1);
    localStorage.setItem("done", JSON.stringify(done));
}


function allclear(e) {          //clears localstorage
    let item = e.target
    let x = document.querySelector(".list")
    x.innerHTML = "";       //mice short way that makes html of ul empty so the tasks removed
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

function lct() {    //lct=load checked tasks    
    let done;      //saving content and displaying it when popup reloads for checked tasks.
    if (localStorage.getItem("done") === null) {

        done = [];
    } else {
        done = JSON.parse(localStorage.getItem("done"));
    }

    done.forEach(function (tasks) {
        //TODO DIV

        const todoDiv = document.createElement("div")
        todoDiv.classList.add("tasks")
        todoDiv.classList.add("completed")      //have to add class completed extra or else the task wont be checked on refreshing the page

        //create li

        const newTask = document.createElement("li")
        newTask.classList.add("tasklist")


        newTask.innerText = tasks;  //IMPORTANT- HERE INNER TEXT WILL NOT BE task.value.IT DISPLAYS THE TEXT FROM  tasks.children[0].innerText  
        todoDiv.appendChild(newTask);

        //adding checkbox
        const checkbox = document.createElement("button");
        checkbox.classList.add("strike")     //HERE WE WILL ADD CLASS strike NOT complete.
        checkbox.innerHTML = '<i class="far fa-check-square"></i>';//why cant we use double quotes here....on using double quotes,we get an error.
        todoDiv.appendChild(checkbox);
        checkbox.addEventListener("click", check);

        //adding delete button
        const trashbtn = document.createElement("button");
        trashbtn.classList.add ("check")    //HERE WE WILL ADD CLASS check NOT trash.IF trash IS ADDED,THE if-else ladder WONT WORK
        trashbtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        todoDiv.appendChild(trashbtn);
        trashbtn.addEventListener("click", clear);

        //appending to list
        list.appendChild(todoDiv);

    })
}

