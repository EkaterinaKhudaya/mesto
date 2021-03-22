import '/src/pages/index.css';
import {Card} from './scripts/components/Card.js'
import {FormValidator} from './scripts/components/FormValidator.js'
import {Section} from './scripts/components/Section.js'
import Popup from './scripts/components/Popup.js'
import PopupWithImage from './scripts/components/PopupWithImage.js'
import PopupWithForm from './scripts/components/PopupWithForm.js'
import UserInfo from './scripts/components/UserInfo.js'
import * as constants from './scripts/utils/constants.js'

const profile = new UserInfo({usernameSelector: '.profile__username', userinfoSelector: '.profile__userinfo'})
const CardValidator = new FormValidator(constants.selectors, constants.formCardElement);
const UserDataValidator = new FormValidator(constants.selectors, constants.formUserElement);
const CardPopup = new Popup('.popup_cardInfo')
const UserDataPopup = new Popup('.popup_userdata')
const CardPopupForm = new PopupWithForm({
    popupSelector: '.popup_cardInfo', handleFormSubmit: (data) => {
        const card = new Section({
            items: [{
                name: data.cardDescription,
                link: data.cardImage
            }],
            renderer: (item) => {
                card.addItem(createCard(item));
            },

        }, ".photos__list")
        card.renderItems()
        CardPopupForm.close()
    }
})
const UserDataPopupForm = new PopupWithForm({
        popupSelector: '.popup_userdata', handleFormSubmit: (data) => {
            profile.setUserInfo(data);
            UserDataPopup.close();
        }
    }
)


const cardsList = new Section({
        items: constants.initialCards.reverse(),
        renderer: (item) => {
            cardsList.addItem(createCard(item));
        },
    },
    ".photos__list"
);


function createCard(item) {
    const card = new Card(item, '.card-template', handleCardClick);
    return card.generateCard();
}


function openProfileModal() {
    const data = profile.getUserInfo()
    UserDataPopup.open();
    UserDataPopupForm.setEventListeners()
    constants.popUpUserName.value = data.username;
    constants.popUpUserInfo.value = data.userinfo;
    UserDataValidator.resetValidation();
}

function openCardModal() {
    CardPopup.open()
    CardPopupForm.setEventListeners()
    CardValidator.resetValidation();
}

function handleCardClick(name, link) {
    const imagePopup = new PopupWithImage('.popup_photo', name, link)
    imagePopup.setEventListeners()
    return imagePopup.open()
}

CardPopup.setEventListeners()
UserDataPopup.setEventListeners()
cardsList.renderItems()
CardValidator.enableValidation()
UserDataValidator.enableValidation()
constants.editDataButton.addEventListener('click', openProfileModal);
constants.popUpAddPhotoButton.addEventListener('click', openCardModal);







