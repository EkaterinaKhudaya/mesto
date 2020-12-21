let editData = document.querySelector('.profile__edit-data-button');
let popUpCloseButton = document.querySelector('.popup__close-button');
let popUp = document.querySelector('.popup');
let formElement = popUp.querySelector('.popup__container')
let saveButton = popUp.querySelector('.popup__button');

let userName = document.querySelector('.profile__username');
let userInfo = document.querySelector('.profile__userinfo');
let popUpUserName = document.querySelector('.popup__item_username');
let popUpUserInfo = document.querySelector('.popup__item_userinfo');

/* Функция для передачи данных пользователя в popup */
function getUserData() {
    popUpUserName.value = userName.textContent;
    popUpUserInfo.value = userInfo.textContent;
}

function setUserData () {
    userName.textContent = popUpUserName.value;
    userInfo.textContent =  popUpUserInfo.value;
    closePopUpForm();
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    userName.textContent = popUpUserName.value;
    userInfo.textContent =  popUpUserInfo.value;
}


function openPopUpForm() {
    getUserData()
    popUp.classList.add('popup_opened');
}

function closePopUpForm() {
    popUp.classList.remove('popup_opened');
}


editData.addEventListener('click', openPopUpForm);
popUpCloseButton.addEventListener('click', closePopUpForm);
saveButton.addEventListener('click', setUserData)
formElement.addEventListener('submit', handleFormSubmit);


