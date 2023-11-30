loadPreferences();
fetchPijama();
loadSelectedClasses();

SEARCH_INPUT.addEventListener('input', () => filterByKeyword());
ORDER_INPUT.addEventListener('change', () => reorder());