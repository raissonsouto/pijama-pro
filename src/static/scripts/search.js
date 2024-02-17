function filterByKeyword() {
    const subjects = document.getElementsByClassName('subject-bar');

    Array.from(subjects).forEach(subjectData => {
        const textContent = subjectData.textContent.toLowerCase();
        const shouldDisplay = textContent.includes(SEARCH_INPUT.value.toLowerCase());
        subjectData.style.display = shouldDisplay ? 'flex' : 'none';
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
