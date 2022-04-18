(function populateModal() {
    const modalDiv = document.getElementById("modal--div");
    modalDiv.innerHTML = `<div class="modal add--modal hidden">
    <button class="btn--close-modal">&times;</button>
    <h2 class="modal--header">
        Task Details
    </h2>
    <form class="add--modal--form">
        <label for="item--name">Name</label>
        <input placeholder="Add a Task Name" id="item--name" size="50" maxlength="50" value="" type="text" autofocus required>
        <label for="item--state">State</label>
        <select onchange="check(this);" name="item--state" id="item--state" required>
            <option value="Backlog">Backlog</option>
            <option value="Blocked">Blocked</option>
            <option value="Selected for Development">Selected for Development</option>
            <option value="In Code Review">In Code Review</option>
            <option value="In Testing">In Testing</option>
            <option value="Release Ready">Release Ready</option>
            <option value="Done">Done</option>
        </select>
        <label for="item--description">Description</label>
        <textarea placeholder="Add a detailed description" id="item--description" type="text" rows="8" cols="70" required></textarea>
        <label for="item--team">Team</label>
        <select name="item--team" id="item--team" required>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Devops">Devops</option>
            <option value="Business Analytics">Business Analytics</option>
        </select>
        <label for="item--due-date">Due Date</label>
        <input id="item--due-date" value="" type="date" required>
        <label for="item--done-date">Done Date</label>
        <input id="item--done-date" value="" type="date" required>
        <button type="submit" class="btn btn--save">Save</button>
    </form>
</div>`;
})();

function check(e) {
    console.log("hi");
    if (e.value !== "Done") {
        console.log("ok");
        document.getElementById("item--done-date").style.visibility = "hidden";
        document.querySelector(`label[for="item--done-date"]`).style.visibility = "hidden";
    } else {
        console.log("okn");
        document.getElementById("item--done-date").style.visibility = "visible";
        document.querySelector(`label[for="item--done-date"]`).style.visibility = "visible";
    }
}