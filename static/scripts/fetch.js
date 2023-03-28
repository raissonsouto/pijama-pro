function fetchData() {
    fetch('https://raw.githubusercontent.com/raissonsouto/pijama2json/main/jsons/computer-science/2022.2.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(num => {
                console.log(num)
                let div = document.createElement('div');
                div.innerText = num;
                document.body.appendChild(div);
            });
        })
        .catch(error => console.error(error));
}