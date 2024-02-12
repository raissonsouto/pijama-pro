function fetchPijamaMetadata() {
    const url = `https://raw.githubusercontent.com/raissonsouto/pijama2json/main/jsons/metadata.json`;
    fetch(url)
        .then(response => response.json())
        .then(data => setCoursesAtSearchBar(data))
        .catch(error => alert("Pijama metadata not found!"));
}

function setCoursesAtSearchBar(json) {
    console.log(json);
    let courseDropDown = document.getElementById("course-dropdown");
    const objJSON = JSON.parse(json)

    objJSON.forEach(course => {
        var optionElement = document.createElement("option");
        
        optionElement.value = course["name"];
        optionElement.textContent = course["name"];

        courseDropDown.appendChild(optionElement);
    });
}
