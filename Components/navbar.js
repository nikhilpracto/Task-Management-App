(function populateNavBar() {
    const navBar = document.getElementsByClassName('nav--links')[0];
    navBar.innerHTML += `
        <li class="nav--item">
            <a class="nav--link" href="#">
                Projects
            </a>
        </li>
        <li class="nav--item">
            <a class="nav--link" href="#">
                Planning
            </a>
        </li>
        <li class="nav--item">
            <a class="nav--link" href="#">
                Calendar
            </a>
        </li>
        <li class="nav--item">
            <a class="nav--link" href="#">
                Team
            </a>
        </li>
    `;
})();