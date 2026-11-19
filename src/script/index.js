import { initNavigation } from './navigation.js';
import { initFormReset } from './search.js';
import { initCarousels } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFormReset('searchBox', 'searchInput', 'searchIcon');
    initCarousels();
    initFormReset('newsletterForm', 'newsletterEmail', 'EmailIcon');
});
