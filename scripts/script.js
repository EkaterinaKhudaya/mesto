const popUps = document.querySelectorAll('.popup')
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
popUps.forEach((modal) => {
    modal.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
            closeModal(modal)
        }
    })
})

function createCard(card) {
    const photoElement = photoTemplate.cloneNode(true);
    const photoImage = photoElement.querySelector('.photos__image')
    const photoDescription =  photoElement.querySelector('.photos__caption')
    photoImage.src = card.link;
    photoDescription.textContent = card.name;
    photoElement.querySelector('.photos__delete-button').addEventListener('click', function (event) {
        deletePhoto(event)
    });
    photoElement.querySelector('.photos__like-button').addEventListener('click', function (event) {
        clickOnHeart(event)
    });
    photoElement.querySelector('.photos__image').addEventListener('click', function (event) {
        openPhotoModal(card)
    });
    return photoElement
}

/* Функция для добавления карточки на страницу */
function addPhotoToPage(card) {
    const photoElement = createCard(card)
    photosList.prepend(photoElement);
}

function openModal(modal) {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function closeModal(modal) {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function openProfileModal() {
    openModal(popUpUserData);
    popUpUserName.value = userName.textContent;
    popUpUserInfo.value = userInfo.textContent;
    setListenerToInput(popUpUserData,selectors);
}

function openCardModal() {
    openModal(popUpCardData);
    popUpCardDescription.value = '';
    popUpCardImage.value = '';
    setListenerToInput(popUpCardData,selectors);
}

function openPhotoModal(card) {
    openModal(photoPopUp);
    image.src = card.link;
    caption.textContent = card.name;
}

function saveEditProfile(evt) {
    evt.preventDefault();
    userName.textContent = popUpUserName.value;
    userInfo.textContent = popUpUserInfo.value;
    closeModal(popUpUserData);
}

function handleAddCard(evt) {
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

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closeModal(openedPopup);
  }
}
editDataButton.addEventListener('click', openProfileModal);
formUserElement.addEventListener('submit', function (event) {
    saveEditProfile(event)
});
popUpAddPhotoButton.addEventListener('click', openCardModal);

formCardElement.addEventListener('submit', function (event) {
    handleAddCard(event)
});






