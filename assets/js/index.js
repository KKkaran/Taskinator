
var tasksToDoEl = document.querySelector(".task-list"); 
var formEl = document.querySelector("#task-form");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
console.log(tasksCompletedEl)
var taskIdCounter = 0;

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
    
    var isEdit = formEl.hasAttribute("data-task-id")
    if(isEdit){
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskinput, tasktype, taskId);
    }else{
        var obj = {
            name: taskinput,
            type: tasktype
        }
    }

    createTaskEl(obj);
}; 
var completeEditTask = function(taskName, taskType, taskId) {
    console.log(taskName, taskType, taskId);
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
  };

var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li"); 
    listItemEl.className = "task-item"; 
    //add task id as attribute to the li
    listItemEl.setAttribute("data-task-id",taskIdCounter)
    //creating the div that will go inside the li
    var taskInfo = document.createElement("div");
    taskInfo.className = "task-info"
    taskInfo.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    //adding the div to the li
    //listItemEl.appendChild(taskInfo)

    var taskActionsEl = createTaskActions(taskIdCounter)
    listItemEl.append(taskInfo,taskActionsEl)//adding the buttons and select to
    
    //adding the entire li element to ul
    tasksToDoEl.appendChild(listItemEl);
    
    taskIdCounter++;

}

var createTaskActions = function (taskId) {

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
      }


    return actionContainerEl;
}
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    console.log(taskSelected)
    taskSelected.remove();
};
var editTask = function (taskId) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Bitch"

    formEl.setAttribute("data-task-id", taskId);

    
}
var taskButtonHandler = function(event) {
    console.log(event.target.value);

    if(event.target.matches(".edit-btn")){
        var taskId = event.target.getAttribute("data-task-id")
        editTask(taskId);
    }else if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);      
    }
    
  };
  
formEl.addEventListener("submit", taskFormHandler);
//this even listener listens to an element with type attribute 
//submit and gets triggered!! or when the user hots enter
// on keyboard

var taskStatusChangeHandler = function(event){
    console.log(event.target.value)
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
  
    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
      }
}

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler)






































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