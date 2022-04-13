"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnEditModal = document.querySelector(".btn--edit");
const nav = document.querySelector(".nav");
const taskDetails = document.querySelector(".task--details");
const saveBtn = document.querySelector(".btn--save");

// Modal Window

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    const tasks = JSON.parse(window.localStorage['tasks']);
    const id = JSON.parse(window.localStorage['indexer']);

    document.getElementById("item--name").value = tasks[id].itemName;
    document.getElementById("item--state").value = tasks[id].itemState;
    document.getElementById("item--team").value = tasks[id].itemTeam;
    document.getElementById("item--description").value = tasks[id].itemDescription;
    document.getElementById("item--due-date").value = tasks[id].itemDueDate;
    document.getElementById("item--done-date").value = tasks[id].itemDoneDate;
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnEditModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// Task Object 

function populateLocalStorage() {
    const tasks = [
        {
            itemName: "ItemName",
            itemState: "ItemState",
            itemDescription: "ItemDescription",
            itemTeam: "ItemTeam",
            itemDueDate: "ItemDueDate",
            itemDoneDate: "ItemDoneDate"
        }
    ]
    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadFromLocalStorage();
}

// Fill the details

// populateLocalStorage();

function loadFromLocalStorage() {
    const tasks = JSON.parse(window.localStorage['tasks']);
    console.log(tasks);
    if (tasks.length === 0) return;

    const taskHeading = document.querySelector(".task--heading");
    const taskState = document.querySelector(".task--state");
    const taskTeam = document.querySelector(".task--team");
    const taskDescription = document.querySelector(".task--description");
    const taskDueDate = document.querySelector(".task--due-date");
    const taskDoneDate = document.querySelector(".task--done-date");

    console.log(window.localStorage['indexer']);
    const id = JSON.parse(window.localStorage['indexer']);

    console.log(taskHeading);

    taskHeading.textContent = tasks[id].itemName;
    taskState.textContent = tasks[id].itemState;
    taskTeam.textContent = tasks[id].itemTeam;
    taskDescription.textContent = tasks[id].itemDescription;
    taskDueDate.textContent = tasks[id].itemDueDate;
    taskDoneDate.textContent = tasks[id].itemDoneDate;
};

loadFromLocalStorage();

// Update Task Details in Tasks Item 

function updateData() {
    const tasks = JSON.parse(window.localStorage['tasks']);
    const id = JSON.parse(window.localStorage['indexer']);

    const taskHeading = document.getElementById("item--name").value;
    const taskState = document.getElementById("item--state").value;
    const taskTeam = document.getElementById("item--team").value;
    const taskDescription = document.getElementById("item--description").value;
    const taskDueDate = document.getElementById("item--due-date").value;
    const taskDoneDate = document.getElementById("item--done-date").value;

    tasks.forEach((task, index) => {
        if (index == id) {
            task.itemName = taskHeading;
            task.itemState = taskState;
            task.itemTeam = taskTeam;
            task.itemDescription = taskDescription;
            task.itemDueDate = taskDueDate;
            task.itemDoneDate = taskDoneDate;
        }
    })

    window.localStorage.setItem('tasks', JSON.stringify(tasks));

    loadFromLocalStorage();
}

saveBtn.addEventListener('click', updateData);