let editData = document.querySelector('.profile__edit-data-button');
let popUpCloseButton = document.querySelector('.popup__close-button');
let popUp = document.querySelector('.popup');
let formElement = popUp.querySelector('.popup__form');
let userName = document.querySelector('.profile__username');
let userInfo = document.querySelector('.profile__userinfo');
let popUpUserName = document.querySelector('.popup__item_user_name');
let popUpUserInfo = document.querySelector('.popup__item_user_info');



/* Функция для передачи данных пользователя в popup */
function getUserData() {
    popUpUserName.value = userName.textContent;
    popUpUserInfo.value = userInfo.textContent;
}


function openPopUpForm() {
    getUserData()
    popUp.classList.add('popup_opened');
}

function closePopUpForm() {
    popUp.classList.remove('popup_opened');
}

/* Функция для данных пользователя на сервер*/
function handleFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = popUpUserName.value;
    userInfo.textContent = popUpUserInfo.value;
    closePopUpForm();
}


editData.addEventListener('click', openPopUpForm);
popUpCloseButton.addEventListener('click', closePopUpForm);
formElement.addEventListener('submit', handleFormSubmit);



