/* ===========================================================
   Task Board - JavaScript
   This file has all the logic for the app. Each section is
   clearly labeled so it is easy to find and explain.
   ===========================================================
   How the app works (big picture):
   1. We keep a list of tasks in a variable called "tasks".
   2. Every time the list changes, we call render() to update
      what the user sees on screen.
   3. We also save the list to localStorage so tasks survive
      a page refresh.
   =========================================================== */



let tasks = [];
let currentFilter = "all"; 




const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const counter = document.getElementById("counter");
const errorMsg = document.getElementById("error-msg");
const filterBtns = document.querySelectorAll(".filter-btn");



function saveTasks() {
  const tasksAsString = JSON.stringify(tasks);
  localStorage.setItem("task-board-tasks", tasksAsString);
}


function loadTasks() {
  const saved = localStorage.getItem("task-board-tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
}



function addTask() {
  const title = taskInput.value.trim();

  if (title === "") {
    errorMsg.textContent = "Please type a task before adding.";
    return; 
  }


  errorMsg.textContent = "";

  const newTask = {
    id: Date.now(),  
    title: title,
    done: false
  };

 
  tasks.push(newTask);

  taskInput.value = "";


  render();
  saveTasks();
}



function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  render();
  saveTasks();
}




function toggleDone(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].done = !tasks[i].done;
      break; 
    }
  }

  render();
  saveTasks();
}


function render() {
  let tasksToShow = tasks;

  if (currentFilter === "open") {
    tasksToShow = tasks.filter(function (task) {
      return task.done === false;
    });
  } else if (currentFilter === "done") {
    tasksToShow = tasks.filter(function (task) {
      return task.done === true;
    });
  }

  
  let html = "";

  for (let i = 0; i < tasksToShow.length; i++) {
    const task = tasksToShow[i];

    const taskClass = task.done ? "task-item done" : "task-item";

    html += '<li class="' + taskClass + '">';
    html += '  <input type="checkbox"' + (task.done ? " checked" : "") +
            ' onchange="toggleDone(' + task.id + ')"' +
            ' aria-label="Mark task as done">';
    html += '  <span class="task-title">' + escapeHtml(task.title) + '</span>';
    html += '  <button class="delete-btn" onclick="deleteTask(' + task.id + ')">Delete</button>';
    html += '</li>';
  }


  taskList.innerHTML = html;

  let openCount = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done === false) {
      openCount++;
    }
  }

  counter.textContent = openCount + " open " + (openCount === 1 ? "task" : "tasks");

  if (tasks.length === 0) {
    emptyState.style.display = "block";
    emptyState.querySelector("p").textContent =
      "No tasks yet. Add one above to get started!";
  } else if (tasksToShow.length === 0) {
    emptyState.style.display = "block";
    emptyState.querySelector("p").textContent =
      "No " + currentFilter + " tasks.";
  } else {
    emptyState.style.display = "none";
  }


  filterBtns.forEach(function (btn) {
    if (btn.dataset.filter === currentFilter) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}


function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}


addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});


taskInput.addEventListener("input", function () {
  errorMsg.textContent = "";
});


filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    currentFilter = btn.dataset.filter;
    render();
  });
});



loadTasks();
render();
