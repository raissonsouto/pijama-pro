function loadIntoTable() {
    const currentSelected = localStorage.getItem("selectedSubjects");
    const subjectsArray = currentSelected ? currentSelected.split(SPLITTER) : [];

    subjectsArray.forEach(subjectData => insertIntoTable(subjectData));
}

function insertIntoTable(subjectData) {
    let subjectJson = JSON.parse(subjectData);
    subjectJson.schedule.forEach(schedule => {
        let day = schedule[0].substring(0,3);
        let hour = schedule[1].substring(0,2);
        let cellId = day + hour;

        document.getElementById(cellId).innerHTML = subjectJson.name;
    });
}

function removeFromTable(subjectData) {
    let subjectJson = JSON.parse(subjectData);
    subjectJson.schedule.forEach(schedule => {
        let day = schedule[0].substring(0,3);
        let hour = schedule[1].substring(0,2);
        let cellId = day + hour;

        document.getElementById(cellId).innerHTML = "";
    });
}
