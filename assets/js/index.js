
var buttonEl = document.querySelector("#save-task"); 
var tasksToDoEl = document.querySelector(".task-list"); 

var createTaskHandler = function() { 
var listItemEl = document.createElement("li"); 
listItemEl.className = "task-item"; 
listItemEl.textContent = "This is a new task."; 
tasksToDoEl.appendChild(listItemEl); 
}; 

buttonEl.addEventListener("click", createTaskHandler);



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