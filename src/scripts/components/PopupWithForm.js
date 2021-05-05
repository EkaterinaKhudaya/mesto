import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
    }

    open(card, deleteFunction) {
        super.open()
        this._card = card
        this._deleteCard = deleteFunction
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__item');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;

    }

    setEventListeners() {
        super.setEventListeners()
        this._form = this._popup.querySelector('.popup__form')
        if (!!this._form) {
            this._form.addEventListener('submit', (evt) => {
                    evt.preventDefault();
                    this._handleFormSubmit(this._getInputValues())
                }
            );
        } else {
             this._deleteCard =  this._popup.querySelector('.popup__button')
            this._deleteCard.addEventListener('click', evt => {
                this._handleFormSubmit(this._card, this._deleteCard)
            })
        }
    }

    close() {
        super.close()
        if (!!this._form) {
            this._form.reset()
        }

    }
}
