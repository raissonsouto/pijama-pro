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

function checkFreeSchedule(array, subjectData){
    for(let classDay of array){
        for(classTime of classDay){
            for(let curClassTime of subjectData){
                if(curClassTime[0] == classTime[0]){
                    let curClassTime1 = Number(curClassTime[1].substring(0, 2));
                    let curClassTime2 = Number(curClassTime[1].substring(6, 8));
                    let time1 = Number(classTime[1].substring(0, 2));
                    let time2 = Number(classTime[1].substring(6, 8));
                    if((curClassTime1 >= time1 && curClassTime1 <= time2) && (curClassTime2 <= time2)){
                        return false;
                    } 
                }
    }}}
    return true;
}

function addSelectedSubjectCourseAndSemester(){
    let course = localStorage.getItem("selectedSubjectCourse");
    let semester = localStorage.getItem("selectedSubjectSemester");
    if(course == null){
        localStorage.setItem("selectedSubjectCourse", COURSE_INPUT.value);
    }
    if(semester == null){
        localStorage.setItem("selectedSubjectSemester", SEMESTER_INPUT.value);
    }
}

function addSubjectToLocalStorage(subjectData) {
    let currentSelectedSubjects = localStorage.getItem("selectedSubjects");
    let currentSelectedSubjectsArray = currentSelectedSubjects ? currentSelectedSubjects.split(SPLITTER) : [];

    let selectedSubjectsScheduleArray = currentSelectedSubjectsArray.map(obj => JSON.parse(obj)["schedule"]);
    let schedule = JSON.parse(subjectData)["schedule"];

    if (currentSelectedSubjectsArray.includes(subjectData) || !checkFreeSchedule(selectedSubjectsScheduleArray, schedule)) {
        return false;
    }
    currentSelectedSubjectsArray.push(subjectData);
    //selectedSubjectsScheduleArray.push(subjectData);
    // currentSelectedSubjectsArray.sort();

    let updatedSelectedSubjects = currentSelectedSubjectsArray.join('#-#');
    localStorage.setItem("selectedSubjects", updatedSelectedSubjects);
    return true;
}

function deleteSubjectFromLocalStorage(subjectData) {

    let currentSelected = localStorage.getItem("selectedSubjects");
    let subjectsArray = currentSelected ? currentSelected.split(SPLITTER) : [];

    let index = subjectsArray.indexOf(subjectData);

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
    
    let selectedSubjects = localStorage.getItem('selectedSubjects');
    let selectedSubjectsArray = selectedSubjects ? selectedSubjects.split(SPLITTER) : [];

    subjectsArray.push(subjectData);
    let updatedConcludedSubjects = subjectsArray.join('#-#');
    if(selectedSubjectsArray.includes(subjectData)){
      unselectSubjectDiv(subjectBar);
      checkSubjectAvailiability();
    }
    subjectBar.classList.add('concluded-subject');
    localStorage.setItem("concludedSubjects", updatedConcludedSubjects);

    return true;

}

function removeConcludedSubjects(subjectData, subjectsArray, subjectBar) {
    delete subjectsArray[subjectsArray.indexOf(subjectData)]
    subjectBar.classList.remove('concluded-subject');
    let updatedConcludedSubjects = subjectsArray.filter(el => el !== '').join('#-#');
    localStorage.setItem("concludedSubjects", updatedConcludedSubjects);

    return true;

}
