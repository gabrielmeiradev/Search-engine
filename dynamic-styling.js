const search_input = document.querySelector('.search-bar > input[type="text"]')
search_input.addEventListener('focus', () => {
    search_input.parentElement.style.border = '#668AFF 1px solid';
})

search_input.addEventListener('focusout', () => {
    search_input.parentElement.style.border = '#3C3C3E 1px solid';
})