function searchInPijamas() {
    let currentCourse = localStorage.getItem('currentCourse');
    let currentSemester = localStorage.getItem('currentSemester');

    if (currentCourse !== COURSE_INPUT.value || currentSemester !== SEMESTER_INPUT.value) {
        localStorage.setItem('currentCourse', COURSE_INPUT.value);
        localStorage.setItem('currentSemester', SEMESTER_INPUT.value);

        fetchPijama();
        reorder();
    }
}

function filterByKeyword() {
    const classes = document.getElementsByClassName('discipline-bar');

    Array.from(classes).forEach(classData => {
        const textContent = classData.textContent.toLowerCase();
        const shouldDisplay = textContent.includes(SEARCH_INPUT.value.toLowerCase());
        classData.style.display = shouldDisplay ? 'flex' : 'none';
    });
}

function reorder() {
    const order = ORDER_INPUT.value;

    if (order !== localStorage.getItem('currentOrder')) {

        const divs = Array.from(MAIN_DIV.children);

        const firstDiv = divs.shift();
        const reversedDivs = divs.reverse();

        while (MAIN_DIV.firstChild) {
            MAIN_DIV.removeChild(MAIN_DIV.firstChild);
        }

        MAIN_DIV.appendChild(firstDiv);
        reversedDivs.forEach(div => {
            MAIN_DIV.appendChild(div);
        });

        localStorage.setItem('currentOrder', order);
    }
}