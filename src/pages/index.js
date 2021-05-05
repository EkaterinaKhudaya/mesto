import '/src/pages/index.css';
import {Card} from '../scripts/components/Card.js'
import {FormValidator} from '../scripts/components/FormValidator.js'
import {Section} from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import * as constants from '../scripts/utils/constants.js'
import {api} from '../scripts/components/Api'

const cardValidator = new FormValidator(constants.selectors, constants.formCardElement);
const userDataValidator = new FormValidator(constants.selectors, constants.formUserElement);
const avatarValidator = new FormValidator(constants.selectors, constants.formAvatarElement);
const popupWithImage = new PopupWithImage('.popup_photo');
const profile = new UserInfo(
    {
        usernameSelector: '.profile__username',
        userinfoSelector: '.profile__userinfo',
        userinfoAvatar: '.profile__avatar-photo'
    })
const popupCardDelete = new PopupWithForm({
    popupSelector: '.popup_cardDelete',
    handleFormSubmit: (data, deleteCard) => {
        api.deleteCard(data)
            .then(() => deleteCard())
            .catch((error) => console.log(error))
        popupCardDelete.close()
    }
})
const avatarPopupForm = new PopupWithForm({
    popupSelector: '.popup_avatarChange',
    handleFormSubmit: (data) => {
        startLoadData(constants.formAvatarElement)
        api.changeAvatar(data.avatarChange)
            .then(() => getUserInfo())
            .then(() => {
                stopLoadData(constants.formAvatarElement)
                avatarPopupForm.close()
            })
            .catch((error) => console.log(error))
    }
})
const cardPopupForm = new PopupWithForm({
    popupSelector: '.popup_cardInfo', handleFormSubmit: (data) => {
        api.addNewCard(data)
            .then((result) => cardsList.addItem(createCard(result)))
            .then(() => cardPopupForm.close())
            .catch((error) => console.log(error))
    }
})
const userDataPopupForm = new PopupWithForm({
        popupSelector: '.popup_userdata', handleFormSubmit: (data) => {
            startLoadData(constants.popUpUserData)
            api.editProfile(data)
                .then((result) => profile.setUserInfo(result))
                .then(() => {
                    stopLoadData(constants.popUpUserData)
                    userDataPopupForm.close()
                })
                .catch((error) => console.log(error))

        }
    }
)


const cardsList = new Section({
        renderer: (item) => {
            cardsList.addItem(createCard(item));
        },
    },
    ".photos__list"
);

let userData = {}

function createCard(item) {
    const card = new Card(item, userData, '.card-template',
        () => {
            popupWithImage.open(item.link, item.name)
        },
        (data, element, clickFunction) => {
            const activeLike = element.querySelector('.photos__like-button_active')
            let method = ''
            if (!activeLike) {
                data.likes.length++
                method = 'PUT'

            } else {
                data.likes.length--
                method = 'DELETE'
            }
            api.toggleLikeCard(method, {likes: data.likes.length, id: data._id})
                .then((result) => {
                    element.querySelector('.photos__like-number').textContent = result.likes.length
                    clickFunction()
                })
                .catch((error) => console.log(error))
        },
        (card, deleteFunction) => {
            popupCardDelete.open(card, deleteFunction)
        },
    );

    return card.generateCard();
}

function openProfileModal() {
    const data = profile.getUserInfo()
    userDataPopupForm.open();
    constants.popUpUserName.value = data.name;
    constants.popUpUserInfo.value = data.about;
    userDataValidator.resetValidation();
}

function openCardModal() {
    cardPopupForm.open()
    cardValidator.resetValidation();
}

function openAvatarModal() {
    avatarPopupForm.open()
    constants.popAvatarLink.value = userData.avatar
    avatarValidator.resetValidation();
}

function startLoadData(element) {
    element.querySelector('.popup__button').value = 'Сохранить...'
}

function stopLoadData(element) {
    element.querySelector('.popup__button').value = 'Сохранить'
}

function getUserInfo() {
     api.getUserInfo()
        .then((response) => {
            userData = response
            profile.setUserInfo(response)
        })
        .catch((error) => console.log(error))
}

getUserInfo()
api.getInitialCards().then((result) => {
    result.reverse().forEach((item) => cardsList.addItem(createCard(item)))
})

popupWithImage.setEventListeners();
userDataPopupForm.setEventListeners();
cardPopupForm.setEventListeners();
popupCardDelete.setEventListeners();
avatarPopupForm.setEventListeners()
avatarValidator.enableValidation();
cardValidator.enableValidation();
userDataValidator.enableValidation();
constants.editDataButton.addEventListener('click', openProfileModal);
constants.popUpAddPhotoButton.addEventListener('click', openCardModal);
constants.avatarEdit.addEventListener('click', openAvatarModal)







