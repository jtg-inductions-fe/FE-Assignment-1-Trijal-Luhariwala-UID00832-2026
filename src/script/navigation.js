export function initNavigation() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const hamburger = navbar.querySelector('.navbar__hamburger');
    const nav = document.getElementById('primary-navigation');

    const dropdowns = navbar.querySelectorAll('.dropdown');
    const navLinks = nav.querySelectorAll('.dropdown__link');
    const afterNavTarget =
        navbar.querySelector('.navbar__logo-link') ||
        navbar.querySelector('.navbar__action-link');

    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    function isMobileMenuOpen() {
        return nav.classList.contains('is-open');
    }

    function setMobileMenu(shouldOpen) {
        if (shouldOpen) {
            nav.classList.add('is-open');
            hamburger.classList.add('is-open');
            hamburger.setAttribute('aria-expanded', 'true');
            hamburger.setAttribute('aria-label', 'Close navigation menu');
        } else {
            nav.classList.remove('is-open');
            hamburger.classList.remove('is-open');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation menu');
        }
    }

    function closeAllDropdowns(shouldFocusTrigger) {
        for (let i = 0; i < dropdowns.length; i++) {
            const dropdown = dropdowns[i];
            if (dropdown.classList.contains('is-open')) {
                dropdown.classList.remove('is-open');
                const trigger = dropdown.querySelector('.dropdown__head');
                if (trigger) {
                    trigger.setAttribute('aria-expanded', 'false');
                    if (shouldFocusTrigger) {
                        trigger.focus();
                    }
                }
            }
        }
    }

    function updateForScreenSize() {
        const isDesktop = desktopQuery.matches;

        for (let i = 0; i < dropdowns.length; i++) {
            const dropdown = dropdowns[i];
            const trigger = dropdown.querySelector('.dropdown__head');

            if (trigger) {
                if (isDesktop) {
                    trigger.tabIndex = 0;
                    const isOpen = dropdown.classList.contains('is-open');
                    trigger.setAttribute('aria-expanded', String(isOpen));
                } else {
                    trigger.tabIndex = -1;
                    trigger.removeAttribute('aria-expanded');
                }
            }
        }

        if (isDesktop) {
            setMobileMenu(false);
        } else {
            closeAllDropdowns(false);
        }
    }

    navbar.addEventListener('click', function (event) {
        const clickedHamburger = event.target.closest('.navbar__hamburger');
        if (clickedHamburger) {
            const currentlyOpen = isMobileMenuOpen();
            setMobileMenu(!currentlyOpen);
            return;
        }

        const clickedTrigger = event.target.closest('.dropdown__head');
        if (clickedTrigger && desktopQuery.matches) {
            const dropdown = clickedTrigger.closest('.dropdown');
            const isAlreadyOpen = dropdown.classList.contains('is-open');

            closeAllDropdowns(false);

            if (!isAlreadyOpen) {
                dropdown.classList.add('is-open');
                clickedTrigger.setAttribute('aria-expanded', 'true');
            }
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            if (isMobileMenuOpen()) {
                setMobileMenu(false);
                hamburger.focus();
            }
            closeAllDropdowns(true);
            return;
        }

        const isMobile = !desktopQuery.matches;
        if (event.key === 'Tab' && isMobile && isMobileMenuOpen()) {
            const firstLink = navLinks[0];
            const lastLink = navLinks[navLinks.length - 1];
            const activeElement = document.activeElement;

            if (!event.shiftKey && activeElement === hamburger && firstLink) {
                event.preventDefault();
                firstLink.focus();
            } else if (event.shiftKey && activeElement === firstLink) {
                event.preventDefault();
                hamburger.focus();
            } else if (!event.shiftKey && activeElement === lastLink) {
                setMobileMenu(false);
                if (afterNavTarget) {
                    event.preventDefault();
                    afterNavTarget.focus();
                }
            }
        }
    });

    document.addEventListener('click', function (event) {
        const clickedInsideNavbar = navbar.contains(event.target);
        if (!clickedInsideNavbar) {
            setMobileMenu(false);
            closeAllDropdowns(false);
        }
    });

    navbar.addEventListener('focusout', function (event) {
        const nextFocusedElement = event.relatedTarget;
        if (!nextFocusedElement) return;

        const focusLeftMobileMenu =
            !nav.contains(nextFocusedElement) &&
            !hamburger.contains(nextFocusedElement);

        if (isMobileMenuOpen() && focusLeftMobileMenu) {
            setMobileMenu(false);
        }

        for (let i = 0; i < dropdowns.length; i++) {
            const dropdown = dropdowns[i];
            const isOpen = dropdown.classList.contains('is-open');
            const focusLeftDropdown = !dropdown.contains(nextFocusedElement);

            if (isOpen && focusLeftDropdown) {
                closeAllDropdowns(false);
                break;
            }
        }
    });

    updateForScreenSize();
    desktopQuery.addEventListener('change', updateForScreenSize);
}
