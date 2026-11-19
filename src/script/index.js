import { initNavigation } from './navigation.js';
import { initSearch } from './search.js';
import { initCarousels } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSearch();
    initCarousels();
});
