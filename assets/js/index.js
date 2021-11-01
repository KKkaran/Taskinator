
var tasksToDoEl = document.querySelector(".task-list"); 
var formEl = document.querySelector("#task-form");

var taskFormHandler = function(e) { 
    e.preventDefault();
    var taskinput = document.querySelector("input[name='task-name']").value;
    var tasktype = document.querySelector("select[name='task-type']").value;

    // console.log(taskinput.value);
    // console.log(tasktype.value);
    // check if input values are empty strings
    if (!taskinput || !tasktype) {
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset();//this resets the form on every task creation!!!
    
    var obj = {
        name: taskinput,
        type: tasktype
    }
    createTaskEl(obj);
}; 


var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li"); 
    listItemEl.className = "task-item"; 

    //creating the div that will go inside the li
    var taskInfo = document.createElement("div");
    taskInfo.className = "task-info"
    taskInfo.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    //adding the div to the li
    listItemEl.appendChild(taskInfo)

    //adding the entire li element to ul
    tasksToDoEl.appendChild(listItemEl); 
}


formEl.addEventListener("submit", taskFormHandler);
//this even listener listens to an element with type attribute 
//submit and gets triggered!! or when the user hots enter
// on keyboard






































// function getName(callback){
//     var name = prompt("enter your name")
//     callback(name);
// }

// function insertName(namez){
//     btn.innerHTML = "Name is: " + namez

// }
// getName(insertName);

//calling the function from the function is a callback function
//we pass the function as an argument to a function!!