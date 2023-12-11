function checkClassAsDone(disciplineData, disciplineBar) {
    addOrRemoveConcludedClasses(disciplineData);
    hideConcludedClasses(disciplineBar);
}


function hideConcludedClasses(disciplineBar){
    disciplineBar.classList.add('concluded-class', 'hidden-class');
    showConcludedClasses();

}

function showConcludedClasses(){
    let hiddenClasses = document.getElementsByClassName('concluded-class')
    let hiddenClassesArray = hiddenClasses ? Array.from(hiddenClasses) : []
    console.log(hiddenClassesArray)

    hiddenClassesArray.forEach( concluded => {
        if (SHOW_CONCLUDED.checked){
            concluded.classList.remove('hidden-class');
        }else {
            concluded.classList.add('hidden-class')
        }
        
    });
    changeCheckAsDoneButton();
}

function changeCheckAsDoneButton() {
    let hiddenClasses = document.getElementsByClassName('concluded-class')
    let hiddenClassesArray = hiddenClasses ? Array.from(hiddenClasses) : []

    hiddenClassesArray.forEach(concluded => {
        concluded.children[1].children[1].children[0].innerHTML = 'Remover de Concluídas';
        concluded.children[1].children[1].children[0].style.fontSize = '15px';
        concluded.children[1].children[1].style.backgroundColor = 'dark blue';
    })
}