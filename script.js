const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const weekdaySelect = document.getElementById('weekdaySelect');
  const day = weekdaySelect.value;
  const taskText = taskInput.value.trim();

  if (taskText === '') return;

  // Load current tasks
  const tasks = JSON.parse(localStorage.getItem("tasksByDay") || "{}");
  if (!tasks[day]) tasks[day] = [];
  tasks[day].push({ text: taskText, completed: false });
  localStorage.setItem("tasksByDay", JSON.stringify(tasks));

  taskInput.value = '';
  loadTasks();
}

function toggleTask(day, index) {
  const tasks = JSON.parse(localStorage.getItem("tasksByDay") || "{}");
  if (tasks[day] && tasks[day][index]) {
    tasks[day][index].completed = !tasks[day][index].completed;
    localStorage.setItem("tasksByDay", JSON.stringify(tasks));
    loadTasks();
  }
}

function deleteTask(day, index) {
  const tasks = JSON.parse(localStorage.getItem("tasksByDay") || "{}");
  if (tasks[day]) {
    tasks[day].splice(index, 1);
    localStorage.setItem("tasksByDay", JSON.stringify(tasks));
    loadTasks();
  }
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasksByDay") || "{}");
  weekdays.forEach(day => {
    const ul = document.getElementById(day);
    ul.innerHTML = '';
    (tasks[day] || []).forEach((task, idx) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = task.text;
      li.appendChild(span);

      if (task.completed) li.classList.add('completed');

      li.onclick = function(e) {
        if (e.target.tagName !== 'BUTTON') {
          toggleTask(day, idx);
        }
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = function(e) {
        e.stopPropagation();
        deleteTask(day, idx);
      };
      li.appendChild(deleteBtn);
      ul.appendChild(li);
    });
  });
}

function clearTasks() {
  localStorage.removeItem("tasksByDay");
  weekdays.forEach(day => {
    document.getElementById(day).innerHTML = '';
  });
}

window.onload = loadTasks;

