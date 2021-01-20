let editData = document.querySelector('.profile__edit-data-button');
let popUpUserDataCloseButton = document.querySelector('.popup__close-button_userData');
let popUpUserData = document.querySelector('.popup_userdata');
let formUserElement = document.querySelector('.popup__form_userData');
let userName = document.querySelector('.profile__username');
let userInfo = document.querySelector('.profile__userinfo');
let popUpUserName = popUpUserData.querySelector('.popup__item_user_name');
let popUpUserInfo = popUpUserData.querySelector('.popup__item_user_info');
let popUpCardData = document.querySelector('.popup_cardInfo');
let popUpAddPhoto = document.querySelector('.profile__add-photo-button');
let popUpCardDataCloseButton = document.querySelector('.popup__close-button_cardInfo');
let formCardElement = document.querySelector('.popup__form_cardInfo');

let photosList = document.querySelector('.photos__list');

let heartsButtons = photosList.querySelectorAll('.photos__like-button');
let deleteButtons = photosList.querySelectorAll('.photos__delete-button');
let photo = photosList.querySelectorAll('.photos__image');
let photoPopUp = document.querySelector('.popup_photo');
let photoPopUpCloseButton = document.querySelector('.popup__close-button_photo');


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

/*Автоматическое добавление карточкек при загрузки стараницы */
initialCards.forEach((card) => {
    addPhotoToPage(card)
})

/* Функция для добавления карточки на страницу */
function addPhotoToPage(card) {
    const photoTemplate = document.querySelector('#photo').content;
    const photoElement = photoTemplate.cloneNode(true);

    if (card) {
        photoElement.querySelector('.photos__image').src = card.link;
        photoElement.querySelector('.photos__caption').textContent = card.name;
    }
    if (!card) {
        photoElement.querySelector('.photos__image').src = popUpCardData.querySelector('.popup__item_card_image').value;
        photoElement.querySelector('.photos__caption').textContent = popUpCardData.querySelector('.popup__item_card_description').value;
    }

    photoElement.querySelector('.photos__delete-button').addEventListener('click', function () {
        deletePhoto(event)
    })
    photoElement.querySelector('.photos__like-button').addEventListener('click', function () {
        clickOnHeart(event)
    })
    photoElement.querySelector('.photos__image').addEventListener('click', function () {
        openPopUpForm(event, photoPopUp)
    })

    if (card) {
        photosList.append(photoElement)
    }
    if (!card) {
        photosList.prepend(photoElement)
    }


}


/* Отрытие popup */
function openPopUpForm(evt, value) {

    if (value === popUpUserData) {
        popUpUserName.value = userName.textContent;
        popUpUserInfo.value = userInfo.textContent;
        value.classList.add('popup_opened');
    }
    if (value === popUpCardData) {
        popUpCardData.querySelector('.popup__item_card_image').value = '';
        popUpCardData.querySelector('.popup__item_card_description').value = '';
        value.classList.add('popup_opened');
    }
    if (value === photoPopUp) {
        const image = photoPopUp.querySelector('.popup__image-element');
        const caption = photoPopUp.querySelector('.popup__heading-photo');
        const photoInfo = evt.target.closest('.photos__item');
        image.src = evt.target.currentSrc;
        caption.textContent = photoInfo.querySelector('.photos__caption').textContent
        value.classList.add('popup_opened');
    }


}

function closePopUpForm(evt, value) {
    value.classList.remove('popup_opened');
}


/* Функция для данных пользователя на сервер*/
function handleFormSubmit(evt) {
    evt.preventDefault();
    let value
    if (evt.target.classList.contains('popup__form_userData')) {
        userName.textContent = popUpUserName.value;
        userInfo.textContent = popUpUserInfo.value;
        value = popUpUserData
        closePopUpForm(event, value);
    }
    if (evt.target.classList.contains('popup__form_cardInfo')) {
        value = popUpCardData
        addPhotoToPage()
        closePopUpForm(event, value);
    }
}

/*Функция добавления/удаления лайка */

function clickOnHeart(evt) {
    evt.target.classList.toggle('photos__like-button_active');
}

/* Функция для удаления фото со страницы*/
function deletePhoto(evt) {
    const photoItem = evt.target.closest('.photos__item');
    photoItem.remove();
}

editData.addEventListener('click', function () {
    openPopUpForm(event, popUpUserData)
});
popUpUserDataCloseButton.addEventListener('click', function () {
    closePopUpForm(event, popUpUserData)
});
formUserElement.addEventListener('submit', function () {
    handleFormSubmit(event)
});
popUpAddPhoto.addEventListener('click', function () {
    openPopUpForm(event, popUpCardData)
});
popUpCardDataCloseButton.addEventListener('click', function () {
    closePopUpForm(event, popUpCardData)
});
formCardElement.addEventListener('submit', function () {
    handleFormSubmit(event)
});

heartsButtons.forEach((button) => button.addEventListener('click', function () {
    clickOnHeart(event)
}));

deleteButtons.forEach((button) => button.addEventListener('click', function () {
    deletePhoto(event)
}));

photo.forEach((photo) => photo.addEventListener('click', function () {
    openPopUpForm(event, photoPopUp)
}))

photoPopUpCloseButton.addEventListener('click', function () {
    closePopUpForm(event, photoPopUp)
})



