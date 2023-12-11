loadPreferences();
fetchPijama();
loadSelectedClasses();





SEARCH_INPUT.addEventListener('input', () => filterByKeyword());
ORDER_INPUT.addEventListener('change', () => reorder());
SHOW_CONCLUDED.addEventListener('click', () => showConcludedClasses());