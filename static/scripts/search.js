function searchInPijamas() {
    let currentCourse = localStorage.getItem('currentCourse');
    let currentSemester = localStorage.getItem('currentSemester');

    let course = document.getElementById('curso').value;
    let semester = document.getElementById('semestre').value;

    if (currentCourse != course || currentSemester != semester) {
        fetchPijama();
    }
}

function filterByKeyword(keyword) {
    const classes = document.getElementsByClassName('discipline-bar');

    Array.from(classes).forEach(classData => {
        const textContent = classData.textContent.toLowerCase();
        const shouldDisplay = textContent.includes(keyword.toLowerCase());
        classData.style.display = shouldDisplay ? 'flex' : 'none';
    });
}

function reorder(order) {
    if (order !== localStorage.getItem('currentOrder')) {
        localStorage.setItem('currentOrder', order)

        const container = document.getElementsByClassName('main')[0];
        const divs = Array.from(container.children);

        const firstDiv = divs.shift();
        const reversedDivs = divs.reverse();

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        container.appendChild(firstDiv);
        reversedDivs.forEach(div => {
            container.appendChild(div);
        });
    }
}