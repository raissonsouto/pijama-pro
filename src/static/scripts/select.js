
function verifyCourseAndSemester(){ 

    let course = localStorage.getItem("selectedSubjectCourse");
    let semester = localStorage.getItem("selectedSubjectSemester");

    if(!!course && COURSE_INPUT.value != localStorage.getItem("selectedSubjectCourse")){
        return [false, "Curso"];
    }
    if(!!semester && SEMESTER_INPUT.value != localStorage.getItem("selectedSubjectSemester")){
        return [false, "Semestre"];
    }
    return [true];
}

function clickSelectButton(subjectData, subjectBar){

    if(!verifyCourseAndSemester()[0]){

        return;
    }

    let selectedSubjects = localStorage.getItem("selectedSubjects") 
    selectedSubjects = selectedSubjects ? localStorage.getItem("selectedSubjects").split(SPLITTER) : [];

    if(!selectedSubjects.includes(subjectData)){
        selectSubject(subjectData, subjectBar);
    }else{
        unselectSubject(subjectBar);
    }
}

function selectSubject(subjectData) {
    if (!addSubjectToLocalStorage(subjectData)) {
        return;
    }else{
        addSelectedSubjectCourseAndSemester();
    }

    SELECTED_SUBJECTS_WIDGET.style.display = 'block';

    let subjectDataObj = JSON.parse(subjectData);
    drawSelectedSubject(subjectDataObj);
    checkSubjectAvailiability(); 
    showOrHideConflictantSubjects();
}

function checkSubjectAvailiability(){

    let subjects = Array.from(MAIN_DIV.children).filter(child => child.classList.contains("subject-bar"));

    let selectedSubjects = localStorage.getItem("selectedSubjects");
    let selectedSubjectsArray = selectedSubjects ? localStorage.getItem("selectedSubjects").split(SPLITTER) : [];

    subjects.forEach(child =>{
        let subjectMetaData = JSON.parse(child.children[0].content);
        let schedule = subjectMetaData['schedule'];

        let available = selectedSubjectsArray.map(obj => JSON.parse(obj)['schedule']).map(obj => checkFreeSchedule([schedule], obj)).filter(obj => !obj);

        let verification = verifyCourseAndSemester();

        if(!verification[0]){
            child.children[2].children[0].children[0].innerHTML =  verification[1] + " Conflitante";
            child.children[2].children[0].classList.add("conflictant-button");
            child.children[2].children[1].style.display = 'none';
        }else if(available.length != 0){
            if(!selectedSubjectsArray.includes(child.children[0].content)){
                child.classList.add("conflictant-subject");
                child.children[2].children[0].children[0].innerHTML = "Horário Conflitante";
                child.children[2].children[0].classList.add("conflictant-button");
            }else{
                child.children[2].children[0].classList.add("selected-button");
                child.children[2].children[0].children[0].innerHTML = "Remover Seleção";
            } 
        }else{
            child.classList.remove('conflictant-subject');
            child.children[2].children[0].classList.remove("conflictant-button");
            child.children[2].children[0].classList.remove("selected-button");
            child.children[2].children[0].children[0].innerHTML = 'Selecionar';
    }
    });
}

function unselectSubjectTable(subjectBar){

    let subjectElement = subjectBar.parentNode;
    subjectElement.remove();
    console.log(subjectBar.children[0]);
    deleteSubjectFromLocalStorage(subjectBar.children[0].content);

    if (SELECTED_SUBJECTS_WIDGET.childElementCount === 1) {
        SELECTED_SUBJECTS_WIDGET.style.display = 'none';
        localStorage.removeItem("selectedSubjectCourse");
        localStorage.removeItem("selectedSubjectSemester");
    }

}

function unselectSubjectDiv(subjectElement){
    subjectElement.children[1].children[0].classList.remove("selected-button");
    console.log("subject element metaData: ", subjectElement.children[0].content);
    deleteSubjectFromLocalStorage(subjectElement.children[0].content);

    Array.from(SELECTED_SUBJECTS_WIDGET.getElementsByClassName('selected-subject')).forEach(box =>{
        if(box.children[1].getElementsByTagName('meta')[0].content == subjectElement.children[0].content){
            unselectSubjectTable(box.children[1]);
        }
    });
}

function unselectSubject(object) {
    console.log(object);
    if(object.nodeName == "DIV"){
        unselectSubjectDiv(object);
    }else{
        unselectSubjectTable(object);
    }

    checkSubjectAvailiability();
    showOrHideSubjects();
}

function loadSelectedSubjects() {

    const currentSelected = localStorage.getItem("selectedSubjects");
    const subjectsArray = currentSelected ? currentSelected.split(SPLITTER) : [];

    if (subjectsArray.length > 0) {
        SELECTED_SUBJECTS_WIDGET.style.display = 'block';
    }

    subjectsArray.forEach(subjectData => {
        let subjectDataObj = JSON.parse(subjectData);
        drawSelectedSubject(subjectDataObj);
    });
}

function drawSelectedSubject(subjectData) {

    const metaData = document.createElement('meta');
    metaData.content = JSON.stringify(subjectData);

    const div = document.createElement('div');
    div.classList.add('selected-subject');

    const span = document.createElement('span');
    span.textContent = subjectData.name;

    const button = document.createElement('button');
    button.classList.add('unselect');
    button.textContent = '+';
    button.onclick = function () {
        unselectSubject(this);
    };

    button.appendChild(metaData);
    div.appendChild(span);
    div.appendChild(button);

    SELECTED_SUBJECTS_WIDGET.appendChild(div);
}
