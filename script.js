const taskInput =
document.getElementById("taskInput");

const taskDate =
document.getElementById("taskDate");

const taskTime =
document.getElementById("taskTime");

const priority =
document.getElementById("priority");

const addTaskBtn =
document.getElementById("addTaskBtn");

const taskList =
document.getElementById("taskList");

const searchInput =
document.getElementById("searchInput");

const totalTasks =
document.getElementById("totalTasks");

const completedTasks =
document.getElementById("completedTasks");

const pendingTasks =
document.getElementById("pendingTasks");

const progressPercent =
document.getElementById("progressPercent");

const progressFill =
document.getElementById("progressFill");

const filterButtons =
document.querySelectorAll(".filters button");

const themeToggle =
document.getElementById("themeToggle");

let tasks = [];
let currentFilter = "all";

loadTasks();

addTaskBtn.addEventListener(
"click",
addTask
);

searchInput.addEventListener(
"input",
renderTasks
);

filterButtons.forEach(btn => {

    btn.addEventListener(
    "click",
    () => {

        filterButtons.forEach(
        b => b.classList.remove("active")
        );

        btn.classList.add("active");

        currentFilter =
        btn.dataset.filter;

        renderTasks();

    });

});

themeToggle.addEventListener(
"click",
toggleTheme
);

function addTask(){

    const text =
    taskInput.value.trim();

    if(text === ""){

        alert(
        "Please enter a task"
        );

        return;
    }

    const task = {

        id: Date.now(),

        text: text,

        date: taskDate.value,

        time: taskTime.value,

        priority: priority.value,

        completed: false

    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";

}

function renderTasks(){

    taskList.innerHTML = "";

    let filteredTasks =
    tasks.filter(task => {

        if(currentFilter === "completed")
            return task.completed;

        if(currentFilter === "pending")
            return !task.completed;

        return true;

    });

    const searchText =
    searchInput.value.toLowerCase();

    filteredTasks =
    filteredTasks.filter(task =>
    task.text.toLowerCase()
    .includes(searchText)
    );

    filteredTasks.forEach(task => {

        const li =
        document.createElement("li");

        li.className =
        `task-item ${
        task.completed
        ? "completed"
        : ""
        }`;

        li.innerHTML = `

        <div class="task-content">

            <div class="task-title">
                ${task.text}
            </div>

            <div class="task-date">
                📅 ${task.date || "No Date"}
                &nbsp;
                ⏰ ${task.time || ""}
            </div>

            <br>

            <span class="
            priority
            ${task.priority.toLowerCase()}
            ">
            ${task.priority}
            </span>

        </div>

        <div class="task-actions">

            <button
            class="complete-btn"
            onclick="toggleTask(${task.id})">

            ${
            task.completed
            ? "Undo"
            : "Done"
            }

            </button>

            <button
            class="edit-btn"
            onclick="editTask(${task.id})">

            Edit

            </button>

            <button
            class="delete-btn"
            onclick="deleteTask(${task.id})">

            Delete

            </button>

        </div>

        `;

        taskList.appendChild(li);

    });

    updateDashboard();

}

function toggleTask(id){

    tasks =
    tasks.map(task => {

        if(task.id === id){

            task.completed =
            !task.completed;

        }

        return task;

    });

    saveTasks();

    renderTasks();

}

function editTask(id){

    const task =
    tasks.find(
    t => t.id === id
    );

    const updated =
    prompt(
    "Edit Task",
    task.text
    );

    if(
    updated &&
    updated.trim() !== ""
    ){

        task.text =
        updated.trim();

        saveTasks();

        renderTasks();

    }

}

function deleteTask(id){

    if(
    confirm(
    "Delete this task?"
    )
    ){

        tasks =
        tasks.filter(
        task =>
        task.id !== id
        );

        saveTasks();

        renderTasks();

    }

}

function updateDashboard(){

    const total =
    tasks.length;

    const completed =
    tasks.filter(
    task =>
    task.completed
    ).length;

    const pending =
    total - completed;

    totalTasks.textContent =
    total;

    completedTasks.textContent =
    completed;

    pendingTasks.textContent =
    pending;

    const percent =
    total === 0
    ? 0
    :
    Math.round(
    (completed / total)
    * 100
    );

    progressPercent.textContent =
    percent + "%";

    progressFill.style.width =
    percent + "%";

}

function saveTasks(){

    localStorage.setItem(
    "advancedTasks",
    JSON.stringify(tasks)
    );

}

function loadTasks(){

    const saved =
    localStorage.getItem(
    "advancedTasks"
    );

    if(saved){

        tasks =
        JSON.parse(saved);

    }

    renderTasks();

}

function toggleTheme(){

    document.body.classList.toggle(
    "dark-light"
    );

}