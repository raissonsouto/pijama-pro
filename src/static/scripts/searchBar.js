function fetchPijamaMetadata() {
  const url = 'https://raw.githubusercontent.com/raissonsouto/pijama2json/main/jsons/metadata.json';
  fetch(url)
        .then(response => response.json())
        .then(data => setCoursesAtSearchBar(data))
        .catch(error => alert('Pijama metadata not found!'));
}

function setCoursesAtSearchBar(json) {
  let currentCourse = COURSE_INPUT.value;

  if (currentCourse !== '') {
    localStorage.setItem('currentCourse', currentCourse)
  }

  Array.from(COURSE_INPUT.children).forEach(course => {
    COURSE_INPUT.removeChild(course);
  });

  let currentCourseInStorage = localStorage.getItem('currentCourse');
  json.forEach(course => {
      var optionElement = document.createElement('option');

      optionElement.value = course['name'];
      optionElement.textContent = course['title'];

      COURSE_INPUT.appendChild(optionElement);

      if (optionElement.value == currentCourseInStorage) {
        optionElement.selected = true;
      }
    }
  );

  if (currentCourseInStorage == '') {
    localStorage.setItem('currentCourse', COURSE_INPUT.value)
  }
  setSemesterAtSearchBar(json);
}

function setSemesterAtSearchBar(json) {

  let currentSemester = SEMESTER_INPUT.value;
  if (currentSemester !== '') {
    localStorage.setItem('currentSemester', currentSemester);
  }

  Array.from(SEMESTER_INPUT.children).forEach(node => SEMESTER_INPUT.removeChild(node));

  let currentSemesterInStorage = localStorage.getItem('currentSemester');

  let courseAvailableSemesters;
  json.forEach(course => {
      if (course['name'] == COURSE_INPUT.value) {
        courseAvailableSemesters = course['semesters'];

        course['semesters'].forEach(semester => {
            var optionElement = document.createElement('option');

            optionElement.value = semester;
            optionElement.textContent = semester;

            SEMESTER_INPUT.appendChild(optionElement);

            if (optionElement.value == currentSemesterInStorage) {
              optionElement.selected = true;
            }
          });
      }
    });

  if (currentSemesterInStorage == '' || !courseAvailableSemesters.includes(currentSemesterInStorage)) {
    localStorage.setItem('currentSemester', SEMESTER_INPUT.value)
  }
  fetchPijama();
}
