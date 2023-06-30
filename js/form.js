import emailValidator from './modules/emailValidator.js';
import httpAPI from '../dal/http.api.js';

const form = document.forms.callback;
const submitButton = document.getElementById('submit');

const disableSubmitButton = () => {
    if (!submitButton.disabled) {
        submitButton.disabled = true;
        submitButton.classList.add('button_disabled');
    }
};
const enableSubmitButton = () => {
    if (submitButton.disabled) {
        submitButton.disabled = false;
        submitButton.classList.remove('button_disabled');
    }
};

const addButtonLoading = () => {
    disableSubmitButton();
    submitButton.classList.add('button_loading');
};
const removeButtonLoading = () => {
    submitButton.classList.remove('button_loading');
};

const addButtonSuccessful = () => {
    submitButton.classList.add('button_successful');
};
const removeButtonSuccessful = () => {
    enableSubmitButton();
    submitButton.classList.remove('button_successful');
};

const addButtonRejected = () => {
    submitButton.classList.add('button_rejected');
};
const removeButtonRejected = () => {
    enableSubmitButton();
    submitButton.classList.remove('button_rejected');
};

const addErrorMessage = (name, error) => {
    const parent = form[name].parentNode;
    if (parent._error !== error) {
        let errorDiv = document.getElementById(`error-${name}`);
        if (errorDiv) {
            parent.removeChild(errorDiv);
        }
        errorDiv = document.createElement('div');
        errorDiv.id = `error-${name}`;
        errorDiv.className = 'error-field';
        errorDiv.innerText = error;
        parent.append(errorDiv);
        parent._error = error;
    }
};
const removeErrorMessage = (name) => {
    const errorDiv = document.getElementById(`error-${name}`);

    if (errorDiv) {
        const parent = errorDiv.parentNode;
        parent.removeChild(errorDiv);
        parent._error = null;
    }
};

const validate = () => {

    if (!form.name.value.trim() && form.name._isVisited) {
        form.name._error = 'Required field!';
        disableSubmitButton();
    } else if (!form.name.value.trim()) {
        form.name._error = '';
        disableSubmitButton();
    } else {
        form.name._error = null;
    }

    if (!form.email.value && form.email._isVisited) {
        form.email._error = 'Required field!';
        disableSubmitButton();
    } else if (!emailValidator.validate(form.email.value) && form.email._isVisited) {
        form.email._error = 'Incorrect email!';
        disableSubmitButton();
    } else if (!form.email.value) {
        form.email._error = '';
        disableSubmitButton();
    } else {
        form.email._error = null;
    }

    if (!form.message.value.trim() && form.message._isVisited) {
        form.message._error = 'Required field!';
        disableSubmitButton();
    } else if (!form.message.value.trim()) {
        form.message._error = '';
        disableSubmitButton();
    } else {
        form.message._error = null;
    }

    if (!form.agree.checked) {
        form.agree._error = 'disagree';
        disableSubmitButton();
    } else {
        form.agree._error = null;
    }

    if (form.name._error === null
        && form.email._error === null
        && form.message._error === null
        && form.agree._error === null) {
        enableSubmitButton();
    }

    if (form.name._error) {
        addErrorMessage('name', form.name._error);
    } else {
        removeErrorMessage('name');
    }

    if (form.email._error) {
        addErrorMessage('email', form.email._error);
    } else {
        removeErrorMessage('email');
    }

    if (form.message._error) {
        addErrorMessage('message', form.message._error);
    } else {
        removeErrorMessage('message');
    }

};

const onBlurHandler = (name) => {
    if (!form[name]._isVisited) {
        form[name]._isVisited = true;
    }
    validate();
};

const onChangeHandler = (name) => {
    validate();
};

const submitHandler = async (event) => {
    event.preventDefault();

    try {
        addButtonLoading();
        const response = await httpAPI.callback(form.name.value, form.email.value, form.message.value);
        removeButtonLoading();
        addButtonSuccessful();
        const timeoutId = setTimeout(() => {
            form.reset();

            form.name._isVisited = false;
            form.email._isVisited = false;
            form.message._isVisited = false;

            form.name.value = '';
            form.email.value = '';
            form.message.value = '';
            form.agree.checked = false;

            removeButtonSuccessful();
            validate();
        }, 2000);
    } catch (e) {
        removeButtonLoading();
        addButtonRejected();
        const timeoutId = setTimeout(() => {
            removeButtonRejected();
            validate();
        }, 2000);
    }
};

submitButton.addEventListener('click', submitHandler);

form.name.addEventListener('blur', () => onBlurHandler('name'));
form.name.addEventListener('keyup', () => onChangeHandler('name'));

form.email.addEventListener('blur', () => onBlurHandler('email'));
form.email.addEventListener('keyup', () => onChangeHandler('email'));

form.message.addEventListener('blur', () => onBlurHandler('message'));
form.message.addEventListener('keyup', () => onChangeHandler('message'));

form.agree.addEventListener('click', () => onChangeHandler('click'));

validate();