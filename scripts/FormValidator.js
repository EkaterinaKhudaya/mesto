import {hideError} from "./index.js";

export class FormValidator {
    constructor(selectors, formElement) {
        this._selectors = selectors;
        this._formElement = formElement;
    }

    // добавление класса с ошибкой
    _inputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._selectors.inputErrorClass);
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add(this._selectors.errorClass);
    };

// удаляние класса с ошибкой
    _hideError(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._selectors.inputErrorClass);
        this._errorElement.classList.remove(this._selectors.errorClass);
        this._errorElement.textContent = '';
    };

// проверка формы на валидность
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    // активация/дезактивация кнопки submit
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._selectors.inactiveButtonClass)
        } else {
            this._buttonElement.classList.remove(this._selectors.inactiveButtonClass)
        }
    };

    // переключатель добваление/удаление ошибки
    _toggleInputError(inputElement) {
        if (!inputElement.validity.valid) {
            this._inputError(inputElement);
        } else {
            this._hideError();
        }
    };

    /* Вешаем обработчи событий на каждое поле формы */
    _setListenerToInput() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleInputError(inputElement);
                this._toggleButtonState(inputElement);
            });
        })
    };

    enableValidation() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
        this._setListenerToInput()
    };

}
