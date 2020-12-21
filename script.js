let editData = document.querySelector('.profile__edit-data-button');
let popUpCloseButton =  document.querySelector('.popup__close-button');
let popUp = document.querySelector('.popup');


function openPopUpForm() {
     popUp.classList.add('popup_opened');
}
function closePopUpForm() {
     popUp.classList.remove('popup_opened');
}

editData.addEventListener('click', openPopUpForm);
popUpCloseButton.addEventListener('click', closePopUpForm);

