let editData = document.querySelector('.profile__edit-data-button');
let popUpCloseButton = document.querySelector('.popup__close-button');
let popUp = document.querySelector('.popup');
let formElement = popUp.querySelector('.popup__container');
let saveButton = popUp.querySelector('.popup__button');
let userName = document.querySelector('.profile__username');
let userInfo = document.querySelector('.profile__userinfo');
let popUpUserName = document.querySelector('.popup__item_username');
let popUpUserInfo = document.querySelector('.popup__item_userinfo');
let heartButton = document.querySelectorAll('.photos__like-button');



/* Функция для передачи данных пользователя в popup */
function getUserData() {
    popUpUserName.value = userName.textContent;
    popUpUserInfo.value = userInfo.textContent;
}

/* Функция для данных пользователя на сервер*/
function handleFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = popUpUserName.value;
    userInfo.textContent = popUpUserInfo.value;
    closePopUpForm();
}


function openPopUpForm() {
    getUserData()
    popUp.classList.add('popup_opened');
}

function closePopUpForm() {
    popUp.classList.remove('popup_opened');
}
/*Функция для измения стиля кнопки 'Лайк' */
function pressHeart() {
    heartButton.forEach(item => {
        item.addEventListener('click', event => {
            if (item.classList.contains('photos__like-button_active')) {
                item.classList.remove('photos__like-button_active');
                item.classList.add('photos__like-button');
            } else {
                item.classList.add('photos__like-button_active');
                item.classList.remove('.photos__like-button');
            }
        })
    })
}


editData.addEventListener('click', openPopUpForm);
popUpCloseButton.addEventListener('click', closePopUpForm);
saveButton.addEventListener('click', handleFormSubmit);
formElement.addEventListener('submit', handleFormSubmit);
pressHeart();


