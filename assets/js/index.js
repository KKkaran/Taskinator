
var tasksToDoEl = document.querySelector(".task-list"); 
var formEl = document.querySelector("#task-form");

var createTaskHandler = function(e) { 
    e.preventDefault();
    var taskinput = document.querySelector("input[name='task-name']")
    var tasktype = document.querySelector("select[name='task-type']")

    // console.log(taskinput.value);
    // console.log(tasktype.value);
        if(taskinput.value !== ""){
            //creating the li element and giving it the class
            var listItemEl = document.createElement("li"); 
            listItemEl.className = "task-item"; 

            //creating the div that will go inside the li
            var taskInfo = document.createElement("div");
            taskInfo.className = "task-info"
            taskInfo.innerHTML = "<h3 class='task-name'>" + taskinput.value + "</h3><span class='task-type'>" + tasktype.value + "</span>";
            
            //adding the div to the li
            listItemEl.appendChild(taskInfo)

            //adding the entire li element to ul
            tasksToDoEl.appendChild(listItemEl); 
    }
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