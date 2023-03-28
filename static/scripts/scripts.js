function writeStringToCell(cellId, stringToWrite) {
  const cell = document.getElementById(cellId);
  if (cell) {
    cell.innerText = stringToWrite;
  } else {
    console.error(`Cell with ID "${cellId}" not found.`);
  }
}