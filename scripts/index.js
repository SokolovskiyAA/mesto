import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {setingsForm, initialCards} from './constants.js';

const buttonEditProfil = document.querySelector('.profile__bnt_action_edit');
const buttonAddCard = document.querySelector('.profile__bnt_action_add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameProfil = document.querySelector('.popup__input_type_name');
const jobProfil = document.querySelector('.popup__input_type_aboutMy');

const listCards = document.querySelector('.elements__list');

const popupEditProfil = document.querySelector('.popup_editProfile');
const buttonCloseProfil = popupEditProfil.querySelector('.popup__bnt_action_close');
const formEditProfil = popupEditProfil.querySelector('.popup__form');
const formEditProfilValidation = new FormValidator(setingsForm, formEditProfil);

const popupAddCard = document.querySelector('.popup_addFoto');
const buttonCloseCard = popupAddCard.querySelector('.popup__bnt_action_close');
const formAddCard = popupAddCard.querySelector('.popup__form');
const newCardName = popupAddCard.querySelector('.popup__input_type_name');
const newCardLink = popupAddCard.querySelector('.popup__input_type_aboutMy');
const formAddCardValidation = new FormValidator(setingsForm, formAddCard);

const popupOpenFoto = document.querySelector('.popup_openFoto');
const popupFotoCloseButton = popupOpenFoto.querySelector('.popup__bnt_action_close');
const popupFotoImg = popupOpenFoto.querySelector('.popup__foto');
const popupFotoTitle = popupOpenFoto.querySelector('.popup__foto-title');

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closedPopup(popup);
        }
        if (evt.target.classList.contains('popup__bnt_action_close')) {
          closedPopup(popup);
        }
    });
});

buttonEditProfil.addEventListener('click', () => {
    nameProfil.value = profileName.textContent;
    jobProfil.value = profileJob.textContent;
    openedPopup(popupEditProfil);
    formEditProfilValidation.resetValidation();
});

buttonAddCard.addEventListener('click', () => {
    formAddCard.reset();
    openedPopup(popupAddCard);
    formAddCardValidation.resetValidation();
});

const closeEditFormByClickOnEsc = function (event) {
    if (event.key !== 'Escape')
        return;
    const currentOpenPopup = document.querySelector('.popup_opened');
    closedPopup(currentOpenPopup);
}

function openedPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEditFormByClickOnEsc);   
}

//Валидация форм
formEditProfilValidation.enableValidation();
formAddCardValidation.enableValidation();

function closedPopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEditFormByClickOnEsc);
}

const handleCardClick = function (link, name) {
    popupFotoImg.src = link;
    popupFotoTitle.textContent = name;
    openedPopup(popupOpenFoto);
}

const saveEditForm = function (event) {
    event.preventDefault();

    profileName.textContent = nameProfil.value;
    profileJob.textContent = jobProfil.value;
    closedPopup(popupEditProfil);
}

function createNewCard(item) {
    const newCard = new Card(item, '#new_card', handleCardClick);
    return newCard.createNewCard();
}

function renderNewCard(cardItem) {
    listCards.prepend(createNewCard(cardItem));
}

const saveAddForm = function (event) {
    event.preventDefault();
    renderNewCard({ name: newCardName.value, link: newCardLink.value });
    closedPopup(popupAddCard);
}

initialCards.forEach((item) => {
    renderNewCard(item);
});

formEditProfil.addEventListener('submit', saveEditForm);
formAddCard.addEventListener('submit', saveAddForm);
