let addButton = document.querySelector(".button");
let textTask = document.querySelector(".textTaskButton");
let taskList = document.querySelector(".task-list");

addButton.addEventListener("click", function () {
  let text = textTask.value.trim();
  if (text !== "") {
    let li = document.createElement("li");
    li.innerHTML = `  
    <span class="task-text">${text}</span>
    <button class="done-btn">
      <img src="img/checked.png" alt="done" class="icon" />
    </button>
    <button class="delete-btn">
      <img src="img/exit-button.png" alt="delete" class="icon" />
    </button>`;

    taskList.appendChild(li);
    saveTasks();
    textTask.value = "";

    let doneBtn = li.querySelector(".done-btn");
    doneBtn.addEventListener("click", function () {
      let taskText = li.querySelector(".task-text");
      taskText.classList.toggle("completed");
      saveTasks();
    });

    let deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      li.remove();
      saveTasks();
    });
  }
});

function saveTasks() {
  let tasks = [];
  document.querySelectorAll(".task-list li").forEach((li) => {
    let text = li.querySelector(".task-text").textContent;
    let isDone = li.querySelector(".task-text").classList.contains("completed");
    tasks.push({ text, isDone });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(({ text, isDone }) => {
    let li = document.createElement("li");
    li.innerHTML = `  
    <span class="task-text">${text}</span>
    <button class="done-btn">
      <img src="img/checked.png" alt="done" class="icon" />
    </button>
    <button class="delete-btn">
      <img src="img/exit-button.png" alt="delete" class="icon" />
    </button>`;

    taskList.appendChild(li);

    if (isDone) {
      li.querySelector(".task-text").classList.add("completed");
    }

    let doneBtn = li.querySelector(".done-btn");
    doneBtn.addEventListener("click", function () {
      let taskText = li.querySelector(".task-text");
      taskText.classList.toggle("completed");
      saveTasks();
    });

    let deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      li.remove();
      saveTasks();
    });
  });
}

loadTasks(); // 👈 вызов, чтобы всё загрузилось
