const modal = document.getElementsByClassName("modal")[0];
const overlay = document.getElementsByClassName("overlay")[0];
const btnCloseModal = document.getElementsByClassName("btn--close-modal")[0];
const nav = document.getElementsByClassName("nav")[0];
const taskDetails = document.getElementsByClassName("task--details")[0];
const saveBtn = document.getElementsByClassName("btn--save")[0];
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

    document.getElementById("item--name").value = tasks[ids].Name;
    document.getElementById("item--state").value = tasks[ids].State;
    document.getElementById("item--team").value = tasks[ids].Team;
    document.getElementById("item--description").value = tasks[ids].Description;
    document.getElementById("item--due-date").value = tasks[ids].Dates.DueDate;
    document.getElementById("item--done-date").value = tasks[ids].Dates.DoneDate;
    
    if (document.getElementById("item--state").value !== "Done") {
        document.getElementById("item--done-date").style.visibility = "hidden";
        document.querySelector(`label[for="item--done-date"]`).style.visibility = "hidden";
    } else {
        document.getElementById("item--done-date").style.visibility = "visible";
        document.querySelector(`label[for="item--done-date"]`).style.visibility = "visible";
    }
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

    const taskHeading = document.getElementsByClassName("task--heading")[0];
    const taskState = document.getElementsByClassName("task--state")[0];
    const taskTeam = document.getElementsByClassName("task--team")[0];
    const taskDescription = document.getElementsByClassName("task--description")[0];
    const taskDueDate = document.getElementsByClassName("task--due-date")[0];
    const taskDoneDate = document.getElementsByClassName("task--done-date")[0];
    const taskEditButton = document.getElementsByClassName("task--buttons")[0];

    if (data == undefined) return;
    if (tasks[ids] == undefined) return;

    taskHeading.textContent = tasks[ids].Name;

    taskState.innerHTML = `<b>State:</b>`;
    taskState.innerHTML += tasks[ids].State;

    taskTeam.innerHTML = `<b>Team:</b>`;
    taskTeam.innerHTML += tasks[ids].Team;

    taskDescription.innerHTML = tasks[ids].Description.replace(/\n/g, '<br/>');

    taskDueDate.innerHTML = `<b>Due Date:</b>`;
    taskDueDate.innerHTML += tasks[ids].Dates.DueDate;

    if (tasks[ids].Dates.DoneDate != "" && tasks[ids].State == "Done") {
        taskDoneDate.innerHTML = `<b>Done Date:</b>`;
        taskDoneDate.innerHTML += tasks[ids].Dates.DoneDate;
    } else {
        taskDoneDate.innerHTML = ``;
        tasks[ids].Dates.DoneDate = "";
    }

    taskEditButton.innerHTML += `<button class="btn btn--edit">Edit</button>`;

    ModalFunctionality();
};

loadFromLocalStorage();

// Update Task Details in Tasks Item 

function updateData(e) {
    const tasks = JSON.parse(window.localStorage['tasks']);

    const taskHeading = document.getElementById("item--name").value;
    const taskState = document.getElementById("item--state").value;
    const taskTeam = document.getElementById("item--team").value;
    const taskDescription = document.getElementById("item--description").value;
    const taskDueDate = document.getElementById("item--due-date").value;
    const taskDoneDate = document.getElementById("item--done-date").value;

    if (taskHeading == "" || taskDescription === "" || taskDueDate == "" || (taskState == "Done" && taskDoneDate == "")) {
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
            task.Dates.DoneDate = taskState === "Done" ? taskDoneDate : "";
        }
    })

    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    e.preventDefault();
    window.location.href = queryString;
    // loadFromLocalStorage();
}

saveBtn.addEventListener('click', updateData);