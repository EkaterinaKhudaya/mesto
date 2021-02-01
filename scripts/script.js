const popUp = document.querySelectorAll('.popup')
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
const photoTemplate = document.querySelector('#photo').content;
const photosList = document.querySelector('.photos__list');
const photoPopUp = document.querySelector('.popup_photo');
const image = photoPopUp.querySelector('.popup__image-element');
const caption = photoPopUp.querySelector('.popup__heading-photo');

console.log(popUp)
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
initialCards.reverse().forEach((card) => {
    addPhotoToPage(card);
})
/*Вешаем обработчик событий на popUp */
popUp.forEach((modal) => {
    modal.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
            closeModal(modal)
        }
    })
})

/* Функция для добавления карточки на страницу */
function addPhotoToPage(card) {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.photos__image').src = card.link;
    photoElement.querySelector('.photos__caption').textContent = card.name;

    photoElement.querySelector('.photos__delete-button').addEventListener('click', function (event) {
        deletePhoto(event)
    });
    photoElement.querySelector('.photos__like-button').addEventListener('click', function (event) {
        clickOnHeart(event)
    });
    photoElement.querySelector('.photos__image').addEventListener('click', function (event) {
        openPhotoModal(event)
    });
    photosList.prepend(photoElement);
}

function openModal(modal) {
    modal.classList.add('popup_opened');
    console.log(popUp)
}

function closeModal(modal) {
    modal.classList.remove('popup_opened');
}

function openProfileModal() {
    openModal(popUpUserData);
    popUpUserName.value = userName.textContent;
    popUpUserInfo.value = userInfo.textContent;
}

function openCardModal() {
    openModal(popUpCardData);
    popUpCardDescription.value = '';
    popUpCardImage.value = '';
}

function openPhotoModal(evt) {
    openModal(photoPopUp);
    const photoInfo = evt.target.closest('.photos__item');
    image.src = evt.target.currentSrc;
    caption.textContent = photoInfo.querySelector('.photos__caption').textContent;
}

function saveEditProfile(evt) {
    evt.preventDefault();
    userName.textContent = popUpUserName.value;
    userInfo.textContent = popUpUserInfo.value;
    closeModal(popUpUserData);
}

function createCard(evt) {
    evt.preventDefault();
    const card = {
        name: popUpCardDescription.value,
        link: popUpCardImage.value
    }
    addPhotoToPage(card)
    closeModal(popUpCardData);
}

function clickOnHeart(evt) {
    evt.target.classList.toggle('photos__like-button_active');
}

function deletePhoto(evt) {
    const photoItem = evt.target.closest('.photos__item');
    photoItem.remove();
}

editDataButton.addEventListener('click', openProfileModal);
formUserElement.addEventListener('submit', function (event) {
    saveEditProfile(event)
});
popUpAddPhotoButton.addEventListener('click', openCardModal);

formCardElement.addEventListener('submit', function (event) {
    createCard(event)
});





