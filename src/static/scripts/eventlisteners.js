loadPreferences();
fetchPijamaMetadata();
loadSelectedSubjects();

SEARCH_INPUT.addEventListener('input', () => filterByKeyword());
ORDER_INPUT.addEventListener('change', () => reorder());
COURSE_INPUT.addEventListener('change', () => fetchPijamaMetadata());
SEMESTER_INPUT.addEventListener('change', () => fetchPijamaMetadata());
SHOW_CONCLUDED.addEventListener('click', () => showOrHideSubjects());
SHOW_CONFLICTANT.addEventListener('click', () => showOrHideConflictantSubjects());
