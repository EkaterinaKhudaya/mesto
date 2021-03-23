export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._description = data.description;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        this._element.querySelector('.photos__like-button').addEventListener('click', () => {
            this._clickOnHeart()
        });
        this._element.querySelector('.photos__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector).content.querySelector('.photos__item').cloneNode(true)
    }

    generateCard() {
        this._element = this._getTemplate();
        const photoImage = this._element.querySelector('.photos__image')
        photoImage.src = this._link;
        photoImage.alt = this._description;
        this._element.querySelector('.photos__caption').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}


