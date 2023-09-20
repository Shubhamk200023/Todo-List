
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

window.addEventListener("load", loadTasks);
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach((task) => {
      addTaskItem(task.text, task.completed);
    });
  }
}
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskItem(text, completed = false) {
  const taskItem = document.createElement("li");
  taskItem.textContent = text;

  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.addEventListener("click", () => {
    taskItem.classList.toggle("completed");
    updateTaskStatus(text, !completed);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    taskList.removeChild(taskItem);
    removeTask(text);
  });

  if (completed) {
    taskItem.classList.add("completed");
  }

  taskItem.append(completeButton, deleteButton);
  taskList.appendChild(taskItem);
}

function updateTaskStatus(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.map((task) => {
    if (task.text === text) {
      task.completed = completed;
    }
    return task;
  });

  saveTasks(updatedTasks);
}
function removeTask(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((task) => task.text !== text);

  saveTasks(updatedTasks);
}
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  addTaskItem(taskText);
  taskInput.value = "";
  saveTasks([...(JSON.parse(localStorage.getItem("tasks")) || []), { text: taskText, completed: false }]);
});
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTaskItem(taskText);
      taskInput.value = "";
      saveTasks([...(JSON.parse(localStorage.getItem("tasks")) || []), { text: taskText, completed: false }]);
    }
  }
});


