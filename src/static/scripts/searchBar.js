function fetchPijamaMetadata() {
    const url = `https://raw.githubusercontent.com/raissonsouto/pijama2json/main/jsons/metadata.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => setCoursesAtSearchBar(data))
        .catch(error => alert("Pijama metadata not found!"));
}

function setCoursesAtSearchBar(json) {

    let courseDropDown = document.getElementById("course-dropdown");

    json.forEach(course => {
        var optionElement = document.createElement("option");
        
        optionElement.value = "administracao";
        optionElement.textContent = "Administração";

        if (optionElement.value ===) {
            optionElement.selected = true;
        }

        courseDropDown.appendChild(optionElement);
    });
}