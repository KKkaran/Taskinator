
var tasksToDoEl = document.querySelector(".task-list"); 
var formEl = document.querySelector("#task-form");

var createTaskHandler = function(e) { 
    e.preventDefault();
    console.log(e);
    var listItemEl = document.createElement("li"); 
    listItemEl.className = "task-item"; 
    listItemEl.textContent = "This is a new task."; 
    tasksToDoEl.appendChild(listItemEl); 
}; 

formEl.addEventListener("submit", createTaskHandler);
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