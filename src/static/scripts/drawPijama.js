function fetchPijama() {
    let course = localStorage.getItem('currentCourse');
    let semester = localStorage.getItem('currentSemester');

    const baseUrl = "https://raw.githubusercontent.com/raissonsouto/pijama2json/main";
    const jsonUrl = `${baseUrl}/jsons/${course}/${semester}.json`;
    const pdfUrl = `${baseUrl}/pdfs/${course}/${semester}.pdf`;
    const pdfFilename = `${course}-${semester}.pdf`

    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => drawPijama(data))
        .then(() => {
            document.getElementById("download-pijama").setAttribute('href', pdfUrl);
            document.getElementById("download-pijama").setAttribute('download', pdfFilename);
        })
        .catch(error => alert("Não existe pijama nesse semestre para este curso"));
}

function drawPijama(json) {
    let concludedSubjects = localStorage.getItem('concludedSubjects')
    let concludedSubjectsArray = concludedSubjects ? concludedSubjects.split(SPLITTER) : []
    removeAllChildNodes(MAIN_DIV);

    json.forEach(subject => {
        let createdSubject = createSubjectElement(subject)

        MAIN_DIV.appendChild(
            createdSubject
        );
        
        if (concludedSubjectsArray.includes(JSON.stringify(subject))){
            createdSubject.classList.add('concluded-subject');
        }
    });
    showOrHideSubjects();
}

function showOrHideSubjects() {
    let subjects = document.getElementsByClassName('subject-bar'); 
    for(let subject of subjects){
        for(let c of subject.classList){
            if(c=='concluded-subject'){
                if(!SHOW_CONCLUDED.checked){
                subject.style.display = 'none';
                break;
                }else{
                    subject.style.display = '';
                }
                subject.children[1].children[1].getElementsByTagName('label')[0].innerText = 'Não paguei';
                subject.children[1].children[1].getElementsByTagName('label')[0].style['background-color'] = "#b00"; 
                subject.children[1].children[0].style.display = 'none';
            }else{
                subject.children[1].children[1].getElementsByTagName('label')[0].innerText = 'Já paguei';
                subject.children[1].children[1].getElementsByTagName('label')[0].style['background-color']= "#08f";
                subject.children[1].children[0].style.display = '';
            }
        }
    }
}

function removeAllChildNodes(parent) { 
    let children = parent.childNodes;
    Array.from(children).forEach(node => {
        if (node.nodeType === 1 && node.classList.contains('subject-bar')) {
            parent.removeChild(node);
        }
    });
}

function createSubjectElement(subjectData) {
    const subjectBar = document.createElement('div');
    subjectBar.classList.add('subject-bar');

    const subjectInfo = document.createElement('div');
    subjectInfo.classList.add('subject-info');

    const subjectNameH2 = document.createElement('h2');
    subjectNameH2.textContent = subjectData.name;

    const professorParagraph = document.createElement('p');
    professorParagraph.innerHTML = `<strong>Professor(a):</strong> ${subjectData.professor}`;

    const scheduleParagraph = document.createElement('p');
    scheduleParagraph.innerHTML = `<strong>Horário:</strong> ${formatSchedule(subjectData.schedule)}`;

    const vacanciesParagraph = document.createElement('p');
    vacanciesParagraph.innerHTML = `<strong>Vagas ofertadas:</strong> ${subjectData.vacancies}`;

    const subjectActions = document.createElement('div');
    subjectActions.classList.add('subject-actions');

    const selectSubjectButton = createCheckButton('Selecionar');
    const checkAsDone = createCheckButton('Já paguei');
    checkAsDone.classList.add('concluded-button');

    selectSubjectButton.onclick = function() {
        selectSubject(JSON.stringify(subjectData));
    };

    checkAsDone.onclick = function() {
        checkSubjectAsDone(JSON.stringify(subjectData), subjectBar);
    } 

    subjectInfo.appendChild(subjectNameH2);
    subjectInfo.appendChild(professorParagraph);
    subjectInfo.appendChild(scheduleParagraph);
    subjectInfo.appendChild(vacanciesParagraph);

    subjectActions.appendChild(selectSubjectButton);
    subjectActions.appendChild(checkAsDone);

    subjectBar.appendChild(subjectInfo);
    subjectBar.appendChild(subjectActions);

    return subjectBar;
}

function createCheckButton(labelText, isChecked = false) {
    const checkButtonDiv = document.createElement('div');
    checkButtonDiv.classList.add('check-button');

    const label = document.createElement('label');
    label.textContent = labelText;

    checkButtonDiv.appendChild(label);
    return checkButtonDiv;
}

function formatSchedule(schedule) {
    let result = "";

    result += `${schedule[0][0]} às ${schedule[0][1]}`;

    if (schedule.length === 2) {
        result += ` e ${schedule[1][0]} às ${schedule[1][1]}`;
    }

    return result;
}
