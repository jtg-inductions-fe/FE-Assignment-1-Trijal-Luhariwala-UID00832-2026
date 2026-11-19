export function initFormReset(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    const input = form.querySelector('input');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        input.value = '';
        input.focus();
    });
}
