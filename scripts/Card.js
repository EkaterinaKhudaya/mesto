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

    _setEventListeners() {
        this._element.querySelector('.photos__delete-button').addEventListener('click', () => {
            this._deletePhoto()
        });
        this._element.querySelector('.photos__like-button').addEventListener('click',  () => {
            this._clickOnHeart()
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


