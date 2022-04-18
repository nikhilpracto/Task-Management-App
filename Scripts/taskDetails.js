const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const nav = document.querySelector(".nav");
const taskDetails = document.querySelector(".task--details");
const saveBtn = document.querySelector(".btn--save");
const somethingWentWrong = `[{"Name":"Something went wrong!!!","State":"In Code Review","Description":"Okay","Team":"Backend","Dates":{"DueDate":"2022-04-20","DoneDate":"2022-04-20"}}]`;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ids = urlParams.get('id');

// Modal Window

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    const tasks = JSON.parse(window.localStorage['tasks']);
    const id = JSON.parse(window.localStorage['indexer']);

    document.getElementById("item--name").value = tasks[ids].Name;
    document.getElementById("item--state").value = tasks[ids].State;
    document.getElementById("item--team").value = tasks[ids].Team;
    document.getElementById("item--description").value = tasks[ids].Description;
    document.getElementById("item--due-date").value = tasks[ids].Dates.DueDate;
    document.getElementById("item--done-date").value = tasks[ids].Dates.DoneDate;
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

function ModalFunctionality() {
    const btnEditModal = document.getElementsByClassName("btn--edit");

    if (btnEditModal !== undefined)
        btnEditModal[0].addEventListener('click', openModal);

    if (btnCloseModal !== undefined)
        btnCloseModal.addEventListener('click', closeModal);

    if (overlay !== undefined)
        overlay.addEventListener('click', closeModal);
}


document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// Task Object 

function loadFromLocalStorage() {
    const data = window.localStorage['tasks'];

    const tasks = JSON.parse((data != undefined ? data : somethingWentWrong));

    const taskHeading = document.querySelector(".task--heading");
    const taskState = document.querySelector(".task--state");
    const taskTeam = document.querySelector(".task--team");
    const taskDescription = document.querySelector(".task--description");
    const taskDueDate = document.querySelector(".task--due-date");
    const taskDoneDate = document.querySelector(".task--done-date");
    const taskEditButton = document.querySelector(".task--buttons");

    const idd = window.localStorage['indexer'];
    const id = JSON.parse(idd ? idd : "0");

    taskHeading.textContent = tasks[ids].Name;

    if (data == undefined) return;

    taskState.innerHTML = `<b>State:</b>`;
    taskState.innerHTML += tasks[ids].State;

    taskTeam.innerHTML = `<b>Team:</b>`;
    taskTeam.innerHTML += tasks[ids].Team;

    taskDescription.innerHTML = tasks[ids].Description.replace(/\n/g, '<br/>');

    taskDueDate.innerHTML = `<b>Due Date:</b>`;
    taskDueDate.innerHTML += tasks[ids].Dates.DueDate;

    taskDoneDate.innerHTML = `<b>Done Date:</b>`;
    taskDoneDate.innerHTML += tasks[ids].Dates.DoneDate;

    taskEditButton.innerHTML += `<button class="btn btn--edit">Edit</button>`;

    ModalFunctionality();
};

loadFromLocalStorage();

// Update Task Details in Tasks Item 

function updateData(e) {
    const tasks = JSON.parse(window.localStorage['tasks']);
    const indice = window.localStorage['indexer'];

    const id = JSON.parse(indice != undefined ? indice : "0");

    const taskHeading = document.getElementById("item--name").value;
    const taskState = document.getElementById("item--state").value;
    const taskTeam = document.getElementById("item--team").value;
    const taskDescription = document.getElementById("item--description").value;
    const taskDueDate = document.getElementById("item--due-date").value;
    const taskDoneDate = document.getElementById("item--done-date").value;

    if (taskHeading == "" || taskDescription === "" || taskDoneDate == "" || taskDoneDate == "") {
        alert('Fields can not be empty');
        return;
    }

    tasks.forEach((task, index) => {
        if (index == ids) {
            task.Name = taskHeading;
            task.State = taskState;
            task.Team = taskTeam;
            task.Description = taskDescription;
            task.Dates.DueDate = taskDueDate;
            task.Dates.DoneDate = taskDoneDate;
        }
    })

    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    e.preventDefault();
    window.location.href = queryString;
    // loadFromLocalStorage();
}

saveBtn.addEventListener('click', updateData);