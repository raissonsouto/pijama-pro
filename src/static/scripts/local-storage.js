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

function addSubjectToLocalStorage(subjectData) {
    let currentSelected = localStorage.getItem("selectedSubjects");
    let subjectsArray = currentSelected ? currentSelected.split(SPLITTER) : [];

    if (subjectsArray.includes(subjectData)) {
        return false;
    }

    subjectsArray.push(subjectData);
    // subjectsArray.sort();

    let updatedSelectedSubjects = subjectsArray.join('#-#');
    localStorage.setItem("selectedSubjects", updatedSelectedSubjects);

    return true;
}

function deleteSubjectFromLocalStorage(subjectName) {
    let currentSelected = localStorage.getItem("selectedSubjects");
    let subjectsArray = currentSelected ? currentSelected.split(SPLITTER) : [];

    let index = 0;

    for (let subjectData of subjectsArray) {
        let subjectDataObj = JSON.parse(subjectData);

        if (subjectName === subjectDataObj.name) {
            break;
        }

        index++;
    }

    if (window.location.pathname !== "/") {
        removeFromTable(subjectsArray[index]);
    }

    if (index !== -1) {
        subjectsArray.splice(index, 1);

        let updatedSelectedSubjects = subjectsArray.join(SPLITTER);
        localStorage.setItem("selectedSubjects", updatedSelectedSubjects);

        return true;
    }

    return false;
}

function addOrRemoveConcludedSubjects(subjectData, subjectBar){
    let concludedSubjects = localStorage.getItem('concludedSubjects');
    let subjectsArray = concludedSubjects ? concludedSubjects.split(SPLITTER) : [];

    if (subjectsArray.includes(subjectData)) {
        removeConcludedSubjects(subjectData, subjectsArray, subjectBar);
    } else{
        addConcludedSubjects(subjectData, subjectsArray, subjectBar);
    }
    showOrHideSubjects();    
}

function addConcludedSubjects(subjectData, subjectsArray, subjectBar) {
    subjectsArray.push(subjectData);

    let updatedConcludedSubjects = subjectsArray.join('#-#');
    subjectBar.classList = 'subject-bar concluded-subject';
    localStorage.setItem("concludedSubjects", updatedConcludedSubjects);
    return true;

}
function removeConcludedSubjects(subjectData, subjectsArray, subjectBar) {
    delete subjectsArray[subjectsArray.indexOf(subjectData)]
    subjectBar.classList = 'subject-bar';
    let updatedConcludedSubjects = subjectsArray.filter(el => el !== '').join('#-#');
    localStorage.setItem("concludedSubjects", updatedConcludedSubjects);

    return true;

}
