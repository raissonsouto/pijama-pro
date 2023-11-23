function selectClass(className) {
    if (!addClassToLocalStorage(className)) {
        return;
    }
    let selectedClassesList = document.getElementById("selected-classes-box");
    selectedClassesList.style.display = 'block';

    const selectedElement = drawSelectedClass(className);
    selectedClassesList.appendChild(selectedElement);
}

function addClassToLocalStorage(className) {
    let currentSelected = localStorage.getItem("selected-classes");
    let classesArray = currentSelected ? currentSelected.split('#') : [];

    if (classesArray.includes(className)) {
        return false;
    }

    classesArray.push(className);
    classesArray.sort();

    let updatedSelectedClasses = classesArray.join('#');

    localStorage.setItem("selected-classes", updatedSelectedClasses);

    return true;
}

function deleteClassFromLocalStorage(className) {
    let currentSelected = localStorage.getItem("selected-classes");
    let classesArray = currentSelected ? currentSelected.split('#') : [];

    const index = classesArray.indexOf(className);

    if (index !== -1) {
        classesArray.splice(index, 1);
        let updatedSelectedClasses = classesArray.join('#');
        localStorage.setItem("selected-classes", updatedSelectedClasses);
        return true;
    }

    return false;
}

function loadSelectedClasses() {
    const currentSelected = localStorage.getItem("selected-classes");
    const classesArray = currentSelected ? currentSelected.split('#') : [];

    if (classesArray.length > 0) {
        let selectedClassesList = document.getElementById("selected-classes-box");
        selectedClassesList.style.display = 'block';
    }

    classesArray.forEach(className => {
        const element = drawSelectedClass(className);
        selectedClassesList.appendChild(element);
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

    return div;
}

function unselectClass(closeButton) {
    let classElement = closeButton.parentNode;

    deleteClassFromLocalStorage(classElement.textContent.slice(0, -1));
    classElement.remove();

    let selectedClassesList = document.getElementById("selected-classes-box");

    if (selectedClassesList.childElementCount === 1) {
        selectedClassesList.style.display = 'none';
    }
}

function loadIntoTable() {

}
