"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnAddModal = document.querySelector(".btn--add-modal");
const nav = document.querySelector(".nav");
const saveBtn = document.querySelector(".btn--save");
const dashboardTasks = document.querySelector(".dashboard--tasks");
const exportButton = document.querySelector(".btn--export");

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

    const taskslength = window.localStorage.length;
    if (taskslength == 0) {
        window.localStorage.setItem('tasks', JSON.stringify([]));
    }

    const tasks = JSON.parse(window.localStorage['tasks']);

    const newTasks = [...tasks,
    {
        id: tasks.length,
        itemName: taskHeading,
        itemState: taskState,
        itemDescription: taskDescription,
        itemTeam: taskTeam,
        itemDueDate: taskDueDate,
        itemDoneDate: taskDoneDate
    }
    ];

    window.localStorage.setItem('tasks', JSON.stringify(newTasks));

    closeModal();
    populateDashboard();
});

function populateLocalStorage() {
    const taskslength = window.localStorage.length;
    if (taskslength == 0) {
        window.localStorage.setItem('tasks', JSON.stringify([]));
    }
}

populateLocalStorage();

// Dashboard Tasks

function populateDashboard() {
    const tasks = JSON.parse(window.localStorage['tasks']);
    dashboardTasks.innerHTML = "";
    tasks.forEach((task, index) => {
        dashboardTasks.innerHTML += `<div class="task">
            <div class="task--heading">${task.itemName}</div>
            <div class="task--state">${task.itemState}</div>
            <div class="task--team">${task.itemTeam}</div>
            <div class="task--due-date">${task.itemDueDate}</div>
            <div class="task--buttons">
                <button class="btn btn--delete">Delete</button>
            </div>
        </div>`;
    });

    populateDeleteButtons();
    populateTaskCardsFunctionality();
}

populateDashboard();

// Delete Buttons

function populateDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".btn--delete");

    deleteButtons.forEach((button, index) => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            console.log(e);
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
    console.log(taskCards);
    taskCards.forEach((task, index) => {
        task.addEventListener("click", function (e) {
            e.preventDefault();
            if (!e.target.classList.contains("btn--delete")) {
                window.localStorage.setItem('indexer', JSON.stringify(index));
                window.location.href = "./pages/taskDetails.html";
            }
        });
    })
}

populateTaskCardsFunctionality();


// Export Button

// function downloadTasks() {
//     const tasks = JSON.parse(window.localStorage['tasks']);
//     const a = document.createElement("a");
//     const
// }

// exportButton.addEventListener('click', downloadTasks);