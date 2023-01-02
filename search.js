// Dom Elements
const searchButton = document.querySelector("#SearchButton");
const searchBox = document.querySelector("#SearchBox");
const resultArea = document.querySelector("#ResultArea");
const resultCount = document.querySelector("#ResultCount");

// Classes
class Search {
    constructor(term) {
        this.term = term
    }

    findAll() {
        return results.filter(result => 
            result
                    .keywords
                    .map(keyword => normalize(keyword.toLowerCase('')))
                    .includes(normalize(this.term.toLowerCase()))
            ||
            result
                    .content
                    .replace(/[.,]/g, '')
                    .split(' ')
                    .map(word => normalize(word.toLowerCase()))
                    .includes(normalize(this.term.toLowerCase()))
        )
    }

    showAll() {
        return results;
    }
}

// Function to normalize String removing all symbols
const normalize = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
};

// Result element template
const resultElement = (title, content, keywords) => {
    let container = document.createElement('div');
    container.classList.add('Result');
    container.innerHTML = 
    `
        <h1>${title}</h1>
        <p>${content}</p>
        <small>${keywords.join(', ')}</small>
    `
    return container;
}


// ALL RESULTS
const results = [{
        id: 1,
        title: 'Javascript é uma boa linguagem?',
        content: 'Sim, Javascript é uma ótima linguagem para todas as idades e fins. Com ele é possível fazer qualquer coisa.',
        keywords: ['js', 'javascript']
    },
    {
        id: 2,
        title: 'A cor azul é uma boa cor, não?',
        content: 'Não sei, você sabe? Mas é fato que a cor azul é amplamente utilizada no mundo inteiro, tanto naturalmente, cuturalmente quanto comercialmente.',
        keywords: ['azul', 'cores']
    },
    {
        id: 3,
        title: 'Os robôs podem dominar o mundo?',
        content: 'Provavelmente, uma vez que cada dia mais os robôs estão ganhando a possibilidade de se tornarem completamente independentes dos seres humanos.',
        keywords: ['robos', 'ia', 'js']
    }, 
    {
        id: 4,
        title: 'é.',
        content: 'é.',
        keywords: ['é.']
    }

]

function printNoResultMessage(){
    let noResultFeedBackElement = document.createElement('p');
        noResultFeedBackElement.innerText = `Sem resultados para busca. Mostrando todos`;
        noResultFeedBackElement.style.margin = '0';
        noResultFeedBackElement.style.color = 'rgba(255, 255, 255, .3)';
        resultArea.appendChild(noResultFeedBackElement);
}

function search(all) {

    const searchTerm = searchBox.value;
    const thisSearch = new Search(searchTerm);
    let thisResults;
    
    // For recursive function
    if(all){
        thisResults = thisSearch.showAll();
    } else {
        thisResults = thisSearch.findAll();
    }
    
    
    // Showing a message if no results
    if(thisResults.length > 0){
        resultArea.innerHTML = "";
        if(all && all.reason === 'no results'){
            printNoResultMessage();
        }    
    } else {
        search(all = {reason: 'no results'});
    }


    // Showing in page
    thisResults.forEach(result => {
        let element = resultElement(result.title, result.content, result.keywords);
        resultArea.appendChild(element);
    })

    
    if(all && !all.reason){
        resultCount.innerHTML = ``;
    } else{
        resultCount.innerHTML = `Encontrados ${thisResults.length} de ${results.length} resultados - Projeto feito por Gabriel Meira`;
    }
    
}

document.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        search();
    }
});


search(all = true);
