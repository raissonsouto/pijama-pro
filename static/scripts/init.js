function createLocalStorages() {
    let currentCourse = document.getElementById('curso').value;
    let currentSemester = document.getElementById('semestre').value;
    let currentOrder = document.getElementById('order').value;

    localStorage.setItem('currentCourse', currentCourse);
    localStorage.setItem('currentSemester', currentSemester);
    localStorage.setItem('currentOrder', currentOrder);
}

createLocalStorages();
fetchPijama();

const searchBar = document.getElementById('search');
searchBar.addEventListener('input', () => filterByKeyword(searchBar.value));

const order = document.getElementById('order');
order.addEventListener('change', () => reorder(order.value));