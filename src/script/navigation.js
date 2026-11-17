export function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = navbar?.querySelector('.navbar__hamburger');
    const nav = document.getElementById('primary-navigation');
    if (!navbar || !hamburger || !nav) return;

    const dropdowns = [...navbar.querySelectorAll('.dropdown')];
    const navLinks = [...nav.querySelectorAll('.dropdown__link')];
    const afterNavTarget =
        navbar.querySelector('.navbar__logo-link') ||
        navbar.querySelector('.navbar__action-link');
    const tabletQuery = window.matchMedia('(min-width: 1024px)');

    const isMobileNavOpen = () => nav.classList.contains('is-open');

    function setMobileMenu(isOpen) {
        nav.classList.toggle('is-open', isOpen);
        hamburger.classList.toggle('is-open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute(
            'aria-label',
            isOpen ? 'Close navigation menu' : 'Open navigation menu',
        );
    }

    function closeDropdowns(focusTrigger = false) {
        dropdowns.forEach((dropdown) => {
            if (!dropdown.classList.contains('is-open')) return;
            dropdown.classList.remove('is-open');
            const trigger = dropdown.querySelector('.dropdown__head');
            trigger?.setAttribute('aria-expanded', 'false');
            if (focusTrigger) trigger?.focus();
        });
    }

    function syncResponsiveState({ matches: isDesktop }) {
        dropdowns.forEach((dropdown) => {
            const trigger = dropdown.querySelector('.dropdown__head');
            if (!trigger) return;
            trigger.tabIndex = isDesktop ? 0 : -1;
            if (isDesktop) {
                trigger.setAttribute(
                    'aria-expanded',
                    String(dropdown.classList.contains('is-open')),
                );
            } else {
                trigger.removeAttribute('aria-expanded');
            }
        });

        isDesktop ? setMobileMenu(false) : closeDropdowns();
    }

    navbar.addEventListener('click', (event) => {
        if (event.target.closest('.navbar__hamburger')) {
            setMobileMenu(!isMobileNavOpen());
            return;
        }

        const trigger = event.target.closest('.dropdown__head');
        if (trigger && tabletQuery.matches) {
            const dropdown = trigger.closest('.dropdown');
            const willOpen = !dropdown.classList.contains('is-open');
            closeDropdowns();
            if (willOpen) {
                dropdown.classList.add('is-open');
                trigger.setAttribute('aria-expanded', 'true');
            }
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (isMobileNavOpen()) {
                setMobileMenu(false);
                hamburger.focus();
            }
            closeDropdowns(true);
            return;
        }

        if (event.key !== 'Tab' || tabletQuery.matches || !isMobileNavOpen()) {
            return;
        }

        const firstLink = navLinks[0];
        const lastLink = navLinks[navLinks.length - 1];

        if (
            !event.shiftKey &&
            document.activeElement === hamburger &&
            firstLink
        ) {
            event.preventDefault();
            firstLink.focus();
        } else if (event.shiftKey && document.activeElement === firstLink) {
            event.preventDefault();
            hamburger.focus();
        } else if (!event.shiftKey && document.activeElement === lastLink) {
            setMobileMenu(false);
            if (afterNavTarget) {
                event.preventDefault();
                afterNavTarget.focus();
            }
        }
    });

    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target)) {
            setMobileMenu(false);
            closeDropdowns();
        }
    });

    navbar.addEventListener('focusout', ({ relatedTarget: next }) => {
        if (!next) return;
        if (
            isMobileNavOpen() &&
            !nav.contains(next) &&
            !hamburger.contains(next)
        ) {
            setMobileMenu(false);
        }
        if (
            dropdowns.some(
                (d) => d.classList.contains('is-open') && !d.contains(next),
            )
        ) {
            closeDropdowns();
        }
    });

    syncResponsiveState(tabletQuery);
    tabletQuery.addEventListener('change', syncResponsiveState);
}
