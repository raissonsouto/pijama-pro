function loadIntoTable() {
    const currentSelected = localStorage.getItem("selected-classes");
    const classesArray = currentSelected ? currentSelected.split(SPLITTER) : [];

    classesArray.forEach(classData => insertIntoTable(classData));
}

function insertIntoTable(classData) {
    let classJson = JSON.parse(classData);
    classJson.schedule.forEach(schedule => {
        let day = schedule[0].substring(0,3);
        let hour = schedule[1].substring(0,2);
        let cellId = day + hour;

        document.getElementById(cellId).innerHTML = classJson.name;
    });
}

function removeFromTable(classData) {
    let classJson = JSON.parse(classData);
    classJson.schedule.forEach(schedule => {
        let day = schedule[0].substring(0,3);
        let hour = schedule[1].substring(0,2);
        let cellId = day + hour;

        document.getElementById(cellId).innerHTML = "";
    });
}