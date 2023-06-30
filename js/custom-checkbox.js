
const defaultCheckbox = document.getElementById('default-checkbox');
const customCheckbox = document.getElementById('custom-checkbox');
const form = document.forms.callback;

const onChangeHandler = (e) => {
    customCheckbox.classList.toggle('custom-checkbox__label_checked');
};

defaultCheckbox.addEventListener('change', onChangeHandler);
form.addEventListener('reset', onChangeHandler);