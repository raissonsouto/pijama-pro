function fetchPijama() {
    let curso = document.getElementById('curso').value;
    let semestre = document.getElementById('semestre').value;

    let url = `https://raw.githubusercontent.com/raissonsouto/pijama2json/main/jsons/${curso}/${semestre}.json`;
    console.log(url)

    fetch(url)
        .then(response => response.json())
        .then(data => drawPijama(data))
        .catch(error => console.error(error));
}

function drawPijama(json) {
    let main = document.getElementsByClassName('main')[0];

    removeAllChildNodes(main);

    json.forEach(disciplina => {
        main.appendChild(createDisciplineElement(disciplina));
    });
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createDisciplineElement(disciplineData) {
    console.log(disciplineData)

    const disciplineBar = document.createElement('div');
    disciplineBar.classList.add('discipline-bar');

    const disciplineInfo = document.createElement('div');
    disciplineInfo.classList.add('discipline-info');

    const h2 = document.createElement('h2');
    h2.textContent = disciplineData.class;

    const professorParagraph = document.createElement('p');
    professorParagraph.innerHTML = `<strong>Professor:</strong> ${disciplineData.professor[0]}`;

    const scheduleParagraph = document.createElement('p');
    scheduleParagraph.innerHTML = `<strong>Horário:</strong> ${disciplineData.schedule}`; ////////////////////

    const vacanciesParagraph = document.createElement('p');
    vacanciesParagraph.innerHTML = `<strong>Vagas ofertadas:</strong> ${disciplineData.vacancies}`;

    //const prerequisitesParagraph = document.createElement('p');
    //prerequisitesParagraph.innerHTML = `<strong>Pré-requisitos:</strong> ${disciplineData.prerequisites}`;

    const classActions = document.createElement('div');
    classActions.classList.add('class-actions');

    const checkButton1 = createCheckButton('Selecionar');
    const checkButton2 = createCheckButton('Concluída', true);

    disciplineInfo.appendChild(h2);
    disciplineInfo.appendChild(professorParagraph);
    disciplineInfo.appendChild(scheduleParagraph);
    disciplineInfo.appendChild(vacanciesParagraph);
    //disciplineInfo.appendChild(prerequisitesParagraph);

    classActions.appendChild(checkButton1);
    classActions.appendChild(checkButton2);

    disciplineBar.appendChild(disciplineInfo);
    disciplineBar.appendChild(classActions);

    return disciplineBar;
}

function createCheckButton(labelText, isChecked = false) {
    const checkButtonDiv = document.createElement('div');
    checkButtonDiv.classList.add('check-button');

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = isChecked;

    const label = document.createElement('label');
    label.setAttribute('for', labelText.toLowerCase().replace(/\s/g, '-'));
    label.textContent = labelText;

    checkButtonDiv.appendChild(input);
    checkButtonDiv.appendChild(label);

    return checkButtonDiv;
}