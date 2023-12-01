function loadPreferences() {

    let currentCourse = localStorage.getItem('currentCourse');
    let currentSemester = localStorage.getItem('currentSemester');
    localStorage.setItem('currentOrder', "az");

    if (currentCourse === null) {
        currentCourse = COURSE_INPUT.value;
        localStorage.setItem('currentCourse', currentCourse);

    } else {
        COURSE_INPUT.value = currentCourse;
    }

    if (currentSemester === null) {
        currentSemester = SEMESTER_INPUT.value;
        localStorage.setItem('currentSemester', currentSemester);

    } else {
        SEMESTER_INPUT.value = currentSemester;
    }
}

function addClassToLocalStorage(classData) {
    let currentSelected = localStorage.getItem("selected-classes");
    let classesArray = currentSelected ? currentSelected.split(SPLITTER) : [];

    if (classesArray.includes(classData)) {
        return false;
    }

    classesArray.push(classData);
    // classesArray.sort();

    let updatedSelectedClasses = classesArray.join('#-#');
    localStorage.setItem("selected-classes", updatedSelectedClasses);

    return true;
}

function deleteClassFromLocalStorage(className) {
    let currentSelected = localStorage.getItem("selected-classes");
    let classesArray = currentSelected ? currentSelected.split(SPLITTER) : [];

    let index = 0;

    for (let classData of classesArray) {
        let classDataObj = JSON.parse(classData);

        if (className === classDataObj.name) {
            break;
        }

        index++;
    }

    if (window.location.pathname !== "/") {
        removeFromTable(classesArray[index]);
    }

    if (index !== -1) {
        classesArray.splice(index, 1);

        let updatedSelectedClasses = classesArray.join(SPLITTER);
        localStorage.setItem("selected-classes", updatedSelectedClasses);

        return true;
    }

    return false;
}