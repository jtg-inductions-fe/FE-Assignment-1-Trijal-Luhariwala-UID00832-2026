export function initSearch() {
    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.getElementById('searchIcon');

    function resetSearch() {
        searchInput.value = '';
        searchInput.focus();
    }

    searchIcon.addEventListener('click', () => {
        if (searchInput.value.trim().length > 0) {
            resetSearch();
        }
    });

    searchBox.addEventListener('submit', (event) => {
        event.preventDefault();
        resetSearch();
    });
}
