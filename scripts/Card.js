import {openModal} from './index.js'

export class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }
    _deletePhoto() {
        this._element.remove();
    }

    _clickOnHeart() {
        this._element.querySelector('.photos__like-button').classList.toggle('photos__like-button_active');
    }

    _openPhotoModal() {
        this._photoPopUp = document.querySelector('.popup_photo');
        this._photoPopUp.querySelector('.popup__image-element').src = this._link;
        this._photoPopUp.querySelector('.popup__heading-photo').textContent = this._name;
        this._photoPopUp.classList.add('popup_opened');
        openModal(this._photoPopUp);
    }

    _setEventListeners() {
        this._element.querySelector('.photos__delete-button').addEventListener('click', () => {
            this._deletePhoto()
        });
        this._element.querySelector('.photos__like-button').addEventListener('click',  () => {
            this._clickOnHeart()
        });
        this._element.querySelector('.photos__image').addEventListener('click',  () => {
            this._openPhotoModal()
        });
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector).content.querySelector('.photos__item').cloneNode(true)
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.photos__image').src = this._link;
        this._element.querySelector('.photos__caption').textContent = this._name;
        return this._element;
    }
}


