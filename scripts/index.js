import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const popupAddCard = document.querySelector('.popup_addFoto');
const buttonCloseCard = popupAddCard.querySelector('.popup__bnt_action_close');
const formAddCard = popupAddCard.querySelector('.popup__form');
const newCardName = popupAddCard.querySelector('.popup__input_type_name');
const newCardLink = popupAddCard.querySelector('.popup__input_type_aboutMy');

const popupOpenFoto = document.querySelector('.popup_openFoto');
const popupFotoCloseButton = popupOpenFoto.querySelector('.popup__bnt_action_close');

const setingsForm = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__bnt',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__input-error',
    errorClassActiv: 'popup__input-error_active',
    popupLabel: '.popup__label'
};

const initialCards = [
    {
        name: 'bmw e39',
        link: './images/bmw_e39.jpg'
    },
    {
        name: 'bmw e39 touring',
        link: './images/bmw_e39_turing.jpg'
    },
    {
        name: 'двигатель s62',
        link: './images/s62.jpg'
    },
    {
        name: 'Котик в лаванде. Все любят котиков',
        link: './images/Котик.jpg'
    },
    {
        name: 'Озеро',
        link: './images/Озеро.jpg'
    },
    {
        name: 'Пейзаж',
        link: './images/пейзаж.jpg'
    }
];

buttonEditProfil.addEventListener('click', editProfile);
buttonCloseProfil.addEventListener('click', () => {
    closedPopup(popupEditProfil);
});

buttonAddCard.addEventListener('click', openPopupAdd);
buttonCloseCard.addEventListener('click', () => {
    closedPopup(popupAddCard);
});

popupFotoCloseButton.addEventListener('click', () => {
    closedPopup(popupOpenFoto);
});

function openPopupAdd() {
    formAddCard.reset();
    openedPopup(popupAddCard);
}

function editProfile() {
    nameProfil.value = profileName.textContent;
    jobProfil.value = profileJob.textContent;
    openedPopup(popupEditProfil);
}

const closeEditFormByClickOnEsc = function (event) {
    if (event.key !== 'Escape')
        return;
    const currentOpenPopup = document.querySelector('.popup_opened');
    closedPopup(currentOpenPopup);
}

function openedPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEditFormByClickOnEsc);

    const formElement = popup.querySelector('.popup__form');
    if(formElement != null) {
        const validForm = new FormValidator(setingsForm, popup.querySelector('.popup__form'));
        validForm.validateForm();
    }    
}

function closedPopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEditFormByClickOnEsc);
}

const closeEditFormByClickOnOverlay = function (event) {
    if (event.target !== event.currentTarget)
        return;

    closedPopup(event.target);
}

const saveEditForm = function (event) {
    event.preventDefault();

    profileName.textContent = nameProfil.value;
    profileJob.textContent = jobProfil.value;
    closedPopup(popupEditProfil);
}

function createNewCard(item) {
    const newCard = new Card(item, '#new_card', openedPopup);
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

popupEditProfil.addEventListener('click', closeEditFormByClickOnOverlay);
popupAddCard.addEventListener('click', closeEditFormByClickOnOverlay);
popupOpenFoto.addEventListener('click', closeEditFormByClickOnOverlay);
formEditProfil.addEventListener('submit', saveEditForm);
formAddCard.addEventListener('submit', saveAddForm);
