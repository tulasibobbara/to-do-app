const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    createTask(task.text, task.completed);
  });
};

// Add task
addBtn.addEventListener("click", () => {

  const taskText = taskInput.value.trim();

  if(taskText === ""){
    alert("Please enter a task");
    return;
  }

  createTask(taskText, false);

  saveTasks();

  taskInput.value = "";
});

// Enter key support
taskInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    addBtn.click();
  }
});

// Create task
function createTask(text, completed){

  const li = document.createElement("li");

  if(completed){
    li.classList.add("completed");
  }

  const span = document.createElement("span");
  span.textContent = text;

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("buttons");

  // Complete button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✓";
  completeBtn.classList.add("complete-btn");

  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  buttonDiv.appendChild(completeBtn);
  buttonDiv.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(buttonDiv);

  taskList.appendChild(li);
}

// Save tasks
function saveTasks(){

  const tasks = [];

  document.querySelectorAll("li").forEach(li => {

    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });

  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}