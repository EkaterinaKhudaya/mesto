export class Card {
    constructor(data, userData, cardSelector, handleCardClick, _handleLikeClick, handleDeleteIconClick) {
        this._data = data
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._userData = userData._id;
        this._ownerId = data.owner._id;
        this._id = data._id;
        this._description = data.description;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = _handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
    }

    _deletePhoto() {
        this._element.remove();
    }

    _clickOnHeart(result) {
        this._element.querySelector('.photos__like-number').textContent = result.likes.length
        this._element.querySelector('.photos__like-button').classList.toggle('photos__like-button_active');
    }

    _setEventListeners() {
        this._element.querySelector('.photos__delete-button').addEventListener('click', () => {
            this._handleDeleteIconClick(this._data, this._deletePhoto.bind(this))
        });
        this._element.querySelector('.photos__like-button').addEventListener('click', () => {
             this._handleLikeClick(this._data, this._element,  this._clickOnHeart.bind(this) )

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
        this._element.querySelector('.photos__like-number').textContent = this._likes.length;
        if (this._userData === this._ownerId) {
            this._element.querySelector('.photos__delete-button').classList.add('photos__delete-button_active')
        }
        this._likes.forEach((item) => {
            if (item._id === this._userData) {
                 this._element.querySelector('.photos__like-button').classList.add('photos__like-button_active');
            }
        })
        this._setEventListeners();
        return this._element;
    }
}


