import { initNavigation } from './navigation.js';
import { initFormReset } from './form.js';
import { initCarousels } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFormReset('searchBox');
    initCarousels();
    initFormReset('newsletterForm');
});
