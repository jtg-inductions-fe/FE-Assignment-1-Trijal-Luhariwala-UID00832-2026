export function initFormReset(formId, inputId, clearId) {
    const form = document.getElementById(formId);
    const input = document.getElementById(inputId);
    const clearBtn = document.getElementById(clearId);

    if (!form || !input) return;

    function resetField() {
        input.value = '';
        input.focus();
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (input.value.trim().length > 0) {
                resetField();
            }
        });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        resetField();
    });
}
