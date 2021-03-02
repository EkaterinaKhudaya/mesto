import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'

const popUps = document.querySelectorAll('.popup')
const editDataButton = document.querySelector('.profile__edit-data-button');
const userName = document.querySelector('.profile__username');
const userInfo = document.querySelector('.profile__userinfo');
const popUpUserData = document.querySelector('.popup_userdata');
const popUpUserName = popUpUserData.querySelector('.popup__item_user_name');
const popUpUserInfo = popUpUserData.querySelector('.popup__item_user_info');
const formUserElement = document.querySelector('.popup__form_userData');
const popUpAddPhotoButton = document.querySelector('.profile__add-photo-button');
const popUpCardData = document.querySelector('.popup_cardInfo');
const popUpCardDescription = document.querySelector('.popup__item_card_description');
const popUpCardImage = document.querySelector('.popup__item_card_image');
const formCardElement = document.querySelector('.popup__form_cardInfo');
const photosList = document.querySelector('.photos__list');
const photoPopUp = document.querySelector('.popup_photo');
const imagePopupPicture = photoPopUp.querySelector('.popup__image-element');
const imagePopupCaption = photoPopUp.querySelector('.popup__heading-photo');

const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
const CardValidator = new FormValidator(selectors, formCardElement);
const UserDataValidator = new FormValidator(selectors, formUserElement);

const initialCards = [
    {
        name: 'Архыз',
        description: 'Вид на гору Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        description: 'Вид на реку в Челябинской области зимой',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        description: 'Многоэтажные дома города Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        description: 'Вид на гору',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        description: 'Железная дорого, уходящая в даль',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        description: 'Вид на утёс с озера Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

/*Автоматическое добавление карточкек при загрузки стараницы */
initialCards.reverse().forEach((item) => {
    addPhotoToPage(createCard(item));
})

function createCard(item) {
    const card = new Card(item, '.card-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement
}

/*Вешаем обработчик событий на popUp */
popUps.forEach((modal) => {
    modal.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
            closeModal(modal)
        }
    })
})

/* Функция для добавления карточки на страницу */
function addPhotoToPage(cardElement) {
    photosList.prepend(cardElement);
}

export const openModal = (modal) => {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function closeModal(modal) {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function openProfileModal() {
    openModal(popUpUserData);
    popUpUserName.value = userName.textContent;
    popUpUserInfo.value = userInfo.textContent;
    UserDataValidator.resetValidation();
}

function openCardModal() {
    openModal(popUpCardData);
    popUpCardDescription.value = '';
    popUpCardImage.value = '';
    CardValidator.resetValidation();
}

function saveEditProfile(evt) {
    evt.preventDefault();
    userName.textContent = popUpUserName.value;
    userInfo.textContent = popUpUserInfo.value;
    closeModal(popUpUserData);
}

function handleAddCard(evt) {
    evt.preventDefault();
    const card = {
        name: popUpCardDescription.value,
        link: popUpCardImage.value
    }
    addPhotoToPage(createCard(card));
    closeModal(popUpCardData);
}


function handleCardClick(name, link) {
    imagePopupPicture.src = link
    imagePopupCaption.textContent = name
    openModal(photoPopUp)
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closeModal(openedPopup);
    }
}


CardValidator.enableValidation()
UserDataValidator.enableValidation()

editDataButton.addEventListener('click', openProfileModal);

formUserElement.addEventListener('submit', function (event) {
    saveEditProfile(event)
});
popUpAddPhotoButton.addEventListener('click', openCardModal);

formCardElement.addEventListener('submit', function (event) {
    handleAddCard(event)
});






