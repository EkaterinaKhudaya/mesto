let editData = document.querySelector('.profile__edit-data-button');
let popUpUserDataCloseButton = document.querySelector('.popup__close-button_userData');
let popUpUserData = document.querySelector('.popup__userdata');
let formUserElement = document.querySelector('.popup__form_userData');
let userName = document.querySelector('.profile__username');
let userInfo = document.querySelector('.profile__userinfo');
let popUpUserName = popUpUserData.querySelector('.popup__item_user_name');
let popUpUserInfo = popUpUserData.querySelector('.popup__item_user_info');
let picturesStarted = document.querySelectorAll('.photos__item');
let popUpCardData = document.querySelector('.popup__cardInfo');
let popUpAddPhoto = document.querySelector('.profile__add-photo-button');
let popUpCardDataCloseButton = document.querySelector('.popup__close-button_cardInfo');
let formCardElement = document.querySelector('.popup__form_cardInfo');

let popUpCardDescription = popUpUserData.querySelector('.popup__item_card_description');
let popUpCardImage = popUpUserData.querySelector('.popup__item_card_image');
let photosList = document.querySelector('.photos__list');

let heartsButtons = photosList.querySelectorAll('.photos__like-button');


const initialCards = [
    {
        name: 'Архыз',
        description: 'гора Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        description: 'река среди снегов',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        description: 'многоэтажные здания',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        description: 'вид на гору',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        description: 'железная догора сквозь лес',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        description: 'утёс на озере Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

/*Функция автоматисеки добавляющая картинки в HTML */
picturesStarted.forEach((item, index) => {
    const card = initialCards[index]
    item.querySelector('.photos__image').src = card.link;
    item.querySelector('.photos__image').alt = card.description;
    item.querySelector('.photos__caption').textContent = card.name;
})

/* Функция для добавления фотографий на страницу */
function addPhotoToPage(value) {
    const photoTemplate = document.querySelector('#photo').content;
    const photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.photos__image').src = popUpCardData.querySelector('.popup__item_card_image').value;
    photoElement.querySelector('.photos__caption').textContent = popUpCardData.querySelector('.popup__item_card_description').value;
    photoElement.querySelector('.photos__like-button').addEventListener('click', function () {
        clickOnHeart(event)
    })
    photosList.prepend(photoElement)

}


/* Функция для передачи данных пользователя в popup */
function getUserData() {
    popUpUserName.value = userName.textContent;
    popUpUserInfo.value = userInfo.textContent;
}


function openPopUpForm(value) {
    if (value === popUpUserData) {
        getUserData()
        value.classList.add('popup_opened');
    }
    if (value === popUpCardData) {
        value.classList.add('popup_opened');
    }


}

function closePopUpForm(value) {
    value.classList.remove('popup_opened');
}


/* Функция для данных пользователя на сервер*/
function handleFormSubmit(evt) {
    console.log(evt)
    evt.preventDefault();
    let value
    if (evt.target.classList.contains('popup__form_userData')) {
        userName.textContent = popUpUserName.value;
        userInfo.textContent = popUpUserInfo.value;
        value = popUpUserData
    }
    if (evt.target.classList.contains('popup__form_cardInfo')) {
        value = popUpCardData
        addPhotoToPage(value)
    }

    closePopUpForm(value);
}

/*Функция добавления/удаления лайка */

function clickOnHeart(evt) {
    evt.target.classList.toggle('photos__like-button_active');
}


editData.addEventListener('click', function () {
    openPopUpForm(popUpUserData)
});
popUpUserDataCloseButton.addEventListener('click', function () {
    closePopUpForm(popUpUserData)
});
formUserElement.addEventListener('submit', function () {
    handleFormSubmit(event)
});
popUpAddPhoto.addEventListener('click', function () {
    openPopUpForm(popUpCardData)
});
popUpCardDataCloseButton.addEventListener('click', function () {
    closePopUpForm(popUpCardData)
});
formCardElement.addEventListener('submit', function () {
    handleFormSubmit(event)
});

heartsButtons.forEach((button) => button.addEventListener('click', function () {
    clickOnHeart(event)
}));



