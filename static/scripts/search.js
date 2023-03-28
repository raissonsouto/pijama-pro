function search() {
    let searchBarString = document.getElementById('search').value;
    let articles_list = document.getElementsByClassName('discipline-bar');

    for (let i = 0; i < articles_list.length; i++) {

        if (articles_list[i].innerText.includes(searchBarString)) {
            articles_list[i].style.display = "";
        } else {
            articles_list[i].style.display = "none";
        }
    }
}
