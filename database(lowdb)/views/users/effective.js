let inputSearch = document.querySelector("#search");

inputSearch.addEventListener('change', e => {
    sessionStorage.setItem('name', inputSearch.value);
})

if (sessionStorage.getItem('name') !== null) {
    inputSearch.value = sessionStorage.getItem('name')
}
