function selectSubject(subjectData) {
    if (!addSubjectToLocalStorage(subjectData)) {
        return;
    }

    SELECTED_SUBJECTS_WIDGET.style.display = 'block';

    let subjectDataObj = JSON.parse(subjectData);
    drawSelectedSubject(subjectDataObj.name);
}

function unselectSubject(closeButton) {
    let subjectElement = closeButton.parentNode;

    deleteSubjectFromLocalStorage(subjectElement.textContent.slice(0, -1));
    subjectElement.remove();

    if (SELECTED_SUBJECTS_WIDGET.childElementCount === 1) {
        SELECTED_SUBJECTS_WIDGET.style.display = 'none';
    }
}

function loadSelectedSubjects() {

    const currentSelected = localStorage.getItem("selectedSubjects");
    const subjectsArray = currentSelected ? currentSelected.split(SPLITTER) : [];

    if (subjectsArray.length > 0) {
        SELECTED_SUBJECTS_WIDGET.style.display = 'block';
    }

    subjectsArray.forEach(subjectData => {
        let subjectDataObj = JSON.parse(subjectData);
        drawSelectedSubject(subjectDataObj.name);
    });
}

function drawSelectedSubject(subjectName) {
    const div = document.createElement('div');
    div.classList.add('selected-subject');

    const span = document.createElement('span');
    span.textContent = subjectName;

    const button = document.createElement('button');
    button.classList.add('unselect');
    button.textContent = '+';
    button.onclick = function () {
        unselectSubject(this);
    };

    div.appendChild(span);
    div.appendChild(button);

    SELECTED_SUBJECTS_WIDGET.appendChild(div);
}
