loadPreferences();
fetchPijama();
loadSelectedClasses();


SEARCH_INPUT.addEventListener('input', () => filterByKeyword());
ORDER_INPUT.addEventListener('change', () => reorder());
COURSE_INPUT.addEventListener('change', () => searchInPijamas());
SEMESTER_INPUT.addEventListener('change', () => searchInPijamas());
SHOW_CONCLUDED.addEventListener('click', () => showOrHideClasses());
