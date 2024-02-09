function fetchPijama() {
    let course = localStorage.getItem('currentCourse');
    let semester = localStorage.getItem('currentSemester');

    let url = `https://raw.githubusercontent.com/raissonsouto/pijama2json/main/jsons/${course}/${semester}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => drawPijama(data))
        .catch(error => alert("Não existe pijama nesse semestre para este curso"));
}

function drawPijama(json) {
    let concludedClasses = localStorage.getItem('concludedClasses')
    let concludedClassesArray = concludedClasses ? concludedClasses.split(SPLITTER) : []
    removeAllChildNodes(MAIN_DIV);

    json.forEach(disciplina => {
        let createdDiscipline = createDisciplineElement(disciplina)

        MAIN_DIV.appendChild(
            createdDiscipline
        );
        
        if (concludedClassesArray.includes(JSON.stringify(disciplina))){
            createdDiscipline.classList.add('concluded-class');
        }
    });
    showOrHideClasses();
}

function showOrHideClasses(){
    let classes = document.getElementsByClassName('discipline-bar'); 
    for(let aula of classes){
        for(let c of aula.classList){
            if(c=='concluded-class'){
                if(!SHOW_CONCLUDED.checked){
                aula.style.display = 'none';
                break;
                }else{
                    aula.style.display = '';
                }
                aula.children[1].children[1].getElementsByTagName('label')[0].innerText = 'Remover das Concluídas'; 
                aula.children[1].children[0].style.display = 'none';
            }else{
                aula.children[1].children[1].getElementsByTagName('label')[0].innerText = 'Adicionar às Concluídas'; 
                aula.children[1].children[0].style.display = '';
            }
        }
    }
}

function removeAllChildNodes(parent) { 
    let children = parent.childNodes;
    Array.from(children).forEach(node => {
        if (node.nodeType === 1 && node.classList.contains('discipline-bar')) {
            parent.removeChild(node);
        }
    });
}

function createDisciplineElement(disciplineData) {
    const disciplineBar = document.createElement('div');
    disciplineBar.classList.add('discipline-bar');

    const disciplineInfo = document.createElement('div');
    disciplineInfo.classList.add('discipline-info');

    const classNameH2 = document.createElement('h2');
    classNameH2.textContent = disciplineData.name;

    const professorParagraph = document.createElement('p');
    professorParagraph.innerHTML = `<strong>Professor(a):</strong> ${disciplineData.professor}`;

    const scheduleParagraph = document.createElement('p');
    scheduleParagraph.innerHTML = `<strong>Horário:</strong> ${disciplineData.schedule}`;

    const vacanciesParagraph = document.createElement('p');
    vacanciesParagraph.innerHTML = `<strong>Vagas ofertadas:</strong> ${disciplineData.vacancies}`;

    const classActions = document.createElement('div');
    classActions.classList.add('class-actions');

    const selectClassButton = createCheckButton('Selecionar');
    const checkAsDone = createCheckButton('Adicionar às Concluídas‎ ‎');
    checkAsDone.classList.add('concluded-button');

    selectClassButton.onclick = function() {
        selectClass(JSON.stringify(disciplineData));
    };

    checkAsDone.onclick = function() {
        checkClassAsDone(JSON.stringify(disciplineData), disciplineBar);
    } 

    disciplineInfo.appendChild(classNameH2);
    disciplineInfo.appendChild(professorParagraph);
    disciplineInfo.appendChild(scheduleParagraph);
    disciplineInfo.appendChild(vacanciesParagraph);

    classActions.appendChild(selectClassButton);
    classActions.appendChild(checkAsDone);

    disciplineBar.appendChild(disciplineInfo);
    disciplineBar.appendChild(classActions);

    return disciplineBar;
}

function createCheckButton(labelText, isChecked = false) {
    const checkButtonDiv = document.createElement('div');
    checkButtonDiv.classList.add('check-button');

    const label = document.createElement('label');
    label.textContent = labelText;

    checkButtonDiv.appendChild(label);
    return checkButtonDiv;
}
