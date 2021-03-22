export const editDataButton = document.querySelector('.profile__edit-data-button');
export const popUpUserData = document.querySelector('.popup_userdata');
export const popUpUserName = popUpUserData.querySelector('.popup__item_user_name');
export const popUpUserInfo = popUpUserData.querySelector('.popup__item_user_info');
export const formUserElement = document.querySelector('.popup__form_userData');
export const popUpAddPhotoButton = document.querySelector('.profile__add-photo-button');
export const formCardElement = document.querySelector('.popup__form_cardInfo');
export const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
export const initialCards = [
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
