function fetchPijama() {
    let course = localStorage.getItem('currentCourse');
    let semester = localStorage.getItem('currentSemester');

    let url = `https://raw.githubusercontent.com/raissonsouto/pijama2json/main/jsons/${course}/${semester}.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => drawPijama(data))
        .catch(error => console.error(error));
}

function drawPijama(json) {
    removeAllChildNodes(MAIN_DIV);

    json.forEach(disciplina => {
        MAIN_DIV.appendChild(
            createDisciplineElement(disciplina)
        );
    });
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
    classNameH2.textContent = disciplineData.class;

    const professorParagraph = document.createElement('p');
    professorParagraph.innerHTML = `<strong>Professor(a):</strong> ${disciplineData.professor}`;

    const scheduleParagraph = document.createElement('p');
    scheduleParagraph.innerHTML = `<strong>Horário:</strong> ${disciplineData.schedule}`;

    const vacanciesParagraph = document.createElement('p');
    vacanciesParagraph.innerHTML = `<strong>Vagas ofertadas:</strong> ${disciplineData.vacancies}`;

    const classActions = document.createElement('div');
    classActions.classList.add('class-actions');

    const selectClassButton = createCheckButton('Selecionar');
    const checkAsDone = createCheckButton('Concluída‎ ‎');

    selectClassButton.onclick = function() {
        selectClass(JSON.stringify(disciplineData));
    };

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