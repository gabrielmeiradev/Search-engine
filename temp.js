function search() {
    ResultArea.innerHTML = '';
    results.forEach(element => {
        element.alreadyAttached = false;
    })
    CurrentResult = [];

    searchByKeyword(SearchBox.value, results, CurrentResult)
    searchByTermInDescription(SearchBox.value, results, CurrentResult)

    if(haveResults != true){
        let noResultFeedBackElement = document.createElement('p');
        noResultFeedBackElement.innerText = "Sem resultado! Mostrando todos os conteúdos";
        ResultArea.appendChild(noResultFeedBackElement);

        results.forEach(element => {
            let ResultDiv = document.createElement('div');
            ResultDiv.classList.add('Result');
            ResultDiv.innerHTML =
                `
            <h1>${element.title}</h1>
            <p>${element.content}</p>
            <small>${element.keywords.join(', ')}</small>
            
            `;
    
            ResultArea.appendChild(ResultDiv);
        });
    }

    CurrentResult.forEach(element => {
        let ResultDiv = document.createElement('div');
        ResultDiv.classList.add('Result');
        ResultDiv.innerHTML =
            `
        <h1>${element.title}</h1>
        <p>${element.content}</p>
        <small>${element.keywords.join(', ')}</small>
        
        `;

        ResultArea.appendChild(ResultDiv);
    });

}