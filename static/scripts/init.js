function createLocalStorages() {
    let currentCourse = document.getElementById('curso').value;
    let currentSemester = document.getElementById('curso').value;

    localStorage.setItem('currentCourse', currentCourse);
    localStorage.setItem('currentSemester', currentSemester);
}

createLocalStorages();