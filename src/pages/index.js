import '/src/pages/index.css';
import {Card} from '../scripts/components/Card.js'
import {FormValidator} from '../scripts/components/FormValidator.js'
import {Section} from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import * as constants from '../scripts/utils/constants.js'

const profile = new UserInfo({usernameSelector: '.profile__username', userinfoSelector: '.profile__userinfo'})
const cardValidator = new FormValidator(constants.selectors, constants.formCardElement);
const userDataValidator = new FormValidator(constants.selectors, constants.formUserElement);
const popupWithImage = new PopupWithImage('.popup_photo');
const cardPopupForm = new PopupWithForm({
    popupSelector: '.popup_cardInfo', handleFormSubmit: (data) => {
        const newCard ={
            name: data.cardDescription,
            link: data.cardImage
        }
        cardsList.addItem(createCard(newCard))
        cardPopupForm.close()
    }
})
const userDataPopupForm = new PopupWithForm({
        popupSelector: '.popup_userdata', handleFormSubmit: (data) => {
            profile.setUserInfo(data);
            userDataPopupForm.close();
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
    const card = new Card(item, '.card-template', () => {
        popupWithImage.open(item.link, item.name);
    });
    return card.generateCard();
}

function openProfileModal() {
    const data = profile.getUserInfo()
    userDataPopupForm.open();
    constants.popUpUserName.value = data.username;
    constants.popUpUserInfo.value = data.userinfo;
    userDataValidator.resetValidation();
}

function openCardModal() {
    cardPopupForm.open()
    cardValidator.resetValidation();
}

popupWithImage.setEventListeners();
userDataPopupForm.setEventListeners()
cardPopupForm.setEventListeners()
cardsList.renderItems()
cardValidator.enableValidation()
userDataValidator.enableValidation()
constants.editDataButton.addEventListener('click', openProfileModal);
constants.popUpAddPhotoButton.addEventListener('click', openCardModal);







