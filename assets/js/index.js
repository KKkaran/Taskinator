
var tasksToDoEl = document.querySelector(".task-list"); 
var formEl = document.querySelector("#task-form");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;
var tasks = []

//this method works when the add task button is clicked
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
            type: tasktype,
            status: "to do"
        }
    }

    createTaskEl(obj);
    //console.log(obj.status)
}; 
var completeEditTask = function(taskName, taskType, taskId) {
    console.log(taskName, taskType, taskId);
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
        tasks[i].name = taskName;
        tasks[i].type = taskType;
        }
    };
    saveTasks();
    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
  };


  //this method creates tasks and put them in the to do window
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
    switch (taskDataObj.status) {
        case "to do":
          taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
          tasksToDoEl.append(listItemEl);
          break;
        case "in progress":
          taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
          tasksInProgressEl.append(listItemEl);
          break;
        case "completed":
          taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
          tasksCompletedEl.append(listItemEl);
          break;
        default:
          console.log("Something went wrong!");
      }

    
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj)
    saveTasks();
    //console.log(taskDataObj)
    taskIdCounter++;

}

//this method created the div with edit delete and select funtionality
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
//this method deletes the task completely
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    console.log(taskSelected)
    taskSelected.remove();
    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

// loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
  // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
        updatedTaskArr.push(tasks[i]);
        }
    }

// reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks();
};

//this method edits the task and updates in the main section
var editTask = function (taskId) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Bitch"

    formEl.setAttribute("data-task-id", taskId);

    
}

//this button sees if edit/delete button was clicked
var taskButtonHandler = function(event) {
    //console.log(event.target.value);

    if(event.target.matches(".edit-btn")){
        var taskId = event.target.getAttribute("data-task-id")
        editTask(taskId);
    }else if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);      
    }
    
  };
  
//this even listener listens to an element with type attribute 
//submit and gets triggered!! or when the user hots enter
// on keyboard


//this method moves the tasks around depending on their status
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

      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
          tasks[i].status = statusValue;
        }
      }
    
    saveTasks();
}

var saveTasks = function(){

    //console.log(tasks)
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
var loadTasks = function() {
    var savedTasks = localStorage.getItem("tasks");
    // if there are no tasks, set tasks to an empty array and return out of the function
    if (!savedTasks) {
      return false;
    }
    console.log("Saved tasks found!");
    // else, load up saved tasks
  
    // parse into array of objects
    savedTasks = JSON.parse(savedTasks);
  
    // loop through savedTasks array
    for (var i = 0; i < savedTasks.length; i++) {
      // pass each task object into the `createTaskEl()` function
      createTaskEl(savedTasks[i]);
    }
  };



formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler)

loadTasks();





































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