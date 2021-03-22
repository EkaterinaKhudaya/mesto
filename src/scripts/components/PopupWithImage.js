import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, name, link) {
        super(popupSelector)
        this._link = link;
        this._name = name;

    }

    open() {
        super.open()
        this._popup.querySelector('.popup__image-element').src = this._link;
        this._popup.querySelector('.popup__heading-photo').textContent = this._name;
    }
}

