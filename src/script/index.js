const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');
const searchIcon = document.getElementById('searchIcon');

function resetSearch() {
    searchInput.value = '';
    searchBox.classList.remove('has-text');
    searchInput.focus();
}

searchInput.addEventListener('input', () => {
    if (searchInput.value.trim().length > 0) {
        searchBox.classList.add('has-text');
    } else {
        searchBox.classList.remove('has-text');
    }
});

searchIcon.addEventListener('click', () => {
    if (searchInput.value.length > 0) {
        resetSearch();
    }
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        resetSearch();
    }
});
