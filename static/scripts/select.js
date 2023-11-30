function selectClass(classData) {
    if (!addClassToLocalStorage(classData)) {
        return;
    }

    SELECTED_CLASSES_WIDGET.style.display = 'block';

    let classDataObj = JSON.parse(classData);
    drawSelectedClass(classDataObj.class);
}

function unselectClass(closeButton) {
    let classElement = closeButton.parentNode;

    deleteClassFromLocalStorage(classElement.textContent.slice(0, -1));
    classElement.remove();

    if (SELECTED_CLASSES_WIDGET.childElementCount === 1) {
        SELECTED_CLASSES_WIDGET.style.display = 'none';
    }
}

function loadSelectedClasses() {

    const currentSelected = localStorage.getItem("selected-classes");
    const classesArray = currentSelected ? currentSelected.split(SPLITTER) : [];

    if (classesArray.length > 0) {
        SELECTED_CLASSES_WIDGET.style.display = 'block';
    }

    classesArray.forEach(classData => {
        let classDataObj = JSON.parse(classData);
        drawSelectedClass(classDataObj.class);
    });
}

function drawSelectedClass(className) {
    const div = document.createElement('div');
    div.classList.add('selected-class');

    const span = document.createElement('span');
    span.textContent = className;

    const button = document.createElement('button');
    button.classList.add('unselect');
    button.textContent = '+';
    button.onclick = function () {
        unselectClass(this);
    };

    div.appendChild(span);
    div.appendChild(button);

    SELECTED_CLASSES_WIDGET.appendChild(div);
}