const modal = document.getElementsByClassName("modal")[0];
const overlay = document.getElementsByClassName("overlay")[0];
const btnCloseModal = document.getElementsByClassName("btn--close-modal")[0];
const btnAddModal = document.getElementsByClassName("btn--add-modal")[0];
const nav = document.getElementsByClassName("nav")[0];
const saveBtn = document.getElementsByClassName("btn--save")[0];
const dashboardTasks = document.getElementsByClassName("dashboard--tasks")[0];
const exportButton = document.getElementsByClassName("btn--export")[0];

// Modal Window

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnAddModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// Save Button CTA

saveBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const taskHeading = document.getElementById("item--name").value;
    const taskState = document.getElementById("item--state").value;
    const taskTeam = document.getElementById("item--team").value;
    const taskDescription = document.getElementById("item--description").value;
    const taskDueDate = document.getElementById("item--due-date").value;
    const taskDoneDate = document.getElementById("item--done-date").value;

    if(taskHeading == "" || taskDescription ==="" || taskDueDate=="" || (taskState == "Done" && taskDoneDate == "")){
        alert('Fields can not be empty');
        return;
    }

    const taskslength = window.localStorage.length;
    if (taskslength === 0) {
        window.localStorage.setItem('tasks', JSON.stringify([]));
    }

    const tasks = JSON.parse(window.localStorage['tasks']);

    const newTasks = [...tasks,
    {
        Name: taskHeading,
        State: taskState,
        Description: taskDescription,
        Team: taskTeam,
        Dates: {
            DueDate: taskDueDate,
            DoneDate: taskDoneDate
        }
    }
    ];

    window.localStorage.setItem('tasks', JSON.stringify(newTasks));

    closeModal();
    populateDashboard();
});

// Dashboard Tasks

function populateDashboard() {
    const data = window.localStorage['tasks']
    const tasks = JSON.parse(data ? data : []);
    dashboardTasks.innerHTML = "";
    tasks.forEach((task, index) => {
        console.log(task);
        dashboardTasks.innerHTML += `<div class="task">
            <div class="task--content">
                <div class="task--heading"></div>
                <div class="task--state"><b>State:</b> ${task.State}</div>
                <div class="task--team"><b>Team:</b> ${task.Team}</div>
                <div class="task--due-date"><b>Due Date:</b> ${task.Dates.DueDate}</div>
            </div> 
            <div class="task--buttons">
                <button class="btn btn--delete">Delete</button>
            </div>
        </div>`;
        document.getElementsByClassName("task--heading")[index].textContent = task.Name;
    });

    populateDeleteButtons();
    populateTaskCardsFunctionality();
}

// Delete Buttons

function populateDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".btn--delete");

    deleteButtons.forEach((button, index) => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const tasks = JSON.parse(window.localStorage['tasks']);
            const newTasks = tasks.filter(function (el, ind) {
                return index != ind;
            })
            window.localStorage.setItem('tasks', JSON.stringify(newTasks));
            populateDashboard();
        })
    })
}

function populateTaskCardsFunctionality() {
    const taskCards = document.querySelectorAll(".task");

    taskCards.forEach((task, index) => {
        if (document.querySelectorAll(".task--state")[index].innerHTML == "<b>State:</b> Done") {
            document.querySelectorAll(".task")[index].classList.add("done");
        } else {
            document.querySelectorAll(".task")[index].classList.remove("done");
        }

        task.addEventListener("click", function (e) {
            e.preventDefault();
            if (!e.target.classList.contains("btn--delete")) {
                window.localStorage.setItem('indexer', JSON.stringify(index));
                window.location.href = `./pages/taskDetails.html?id=${index}`;
            }
        });
    })
}

// Main Function

(async function populateLocalStorage() {
    const tasks = window.localStorage["tasks"];
    if (tasks === undefined) {
        await fetch("JSON/initialData.json").then(response => response.json()).then(initialJson => {
            window.localStorage.setItem('tasks', JSON.stringify(initialJson));
        })
    }
    populateDashboard();
    populateTaskCardsFunctionality();
})();

// Export Button

function downloadTasks() {
    const data = window.localStorage['tasks'];
    if (data === undefined) {
        alert("JSON data not available as there are no Tasks");
        return;
    }
    const tasks = JSON.parse(data);

    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(tasks, null, 4)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "tasks-file.json";
    a.click();
}

exportButton.addEventListener('click', downloadTasks);
