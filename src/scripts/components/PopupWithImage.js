import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupImage = this._popup.querySelector('.popup__image-element');
        this._popupHeading =  this._popup.querySelector('.popup__heading-photo');

    }

    open(link, name) {
        this._popupImage.src = link;
        this._popupHeading.textContent = name;
        this._popupImage.setAttribute('alt', `увеличенное изображение ${name}`)
        super.open()
    }
}

