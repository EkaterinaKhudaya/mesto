const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

// добавление класса с ошибкой
const inputError = (formElement, inputElement, errorMessage, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
};

// удаляние класса с ошибкой
const hideError = (formElement, inputElement, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    console.log(errorElement)
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
};
// проверка формы на валидность
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};
// активация/дезактивация кнопки submit
const toggleButtonState = (inputList, buttonElement, selectors) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(selectors.inactiveButtonClass)
    } else {
        buttonElement.classList.remove(selectors.inactiveButtonClass)
    }
};
// переключатель добваление/удаление ошибки
const toggleInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        inputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideError(formElement, inputElement, inputErrorClass, errorClass);
    }
};
/* Вешаем обработчи событий на кадое поле формы */
const setListenerToInput = (formElement, selectors) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, selectors);
    inputList.forEach((inputElement) => {
        hideError(formElement, inputElement, selectors);
        inputElement.addEventListener('input', function () {
            toggleInputError(formElement, inputElement, selectors);
            toggleButtonState(inputList, buttonElement, selectors);
        });
    })
};
/*Формируем лист форм и вешаем на каждую форму обработчик событий*/
const setListenerToForm = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        })
        setListenerToInput(formElement,selectors);
    })
};
const enableValidation = (selectors) => {
    setListenerToForm(selectors)
};

enableValidation(selectors);