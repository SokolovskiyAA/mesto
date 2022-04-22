import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { setingsForm, initialCards, popupSelectors, imageData, profileData } from '../utils/constants.js';

const buttonEditProfil = document.querySelector('.profile__bnt_action_edit');
const buttonAddCard = document.querySelector('.profile__bnt_action_add');
const nameProfil = document.querySelector('.popup__input_type_name');
const jobProfil = document.querySelector('.popup__input_type_aboutMy');

const popupEditProfil = document.querySelector('.popup_editProfile');
const formEditProfil = popupEditProfil.querySelector('.popup__form');
const formEditProfilValidation = new FormValidator(setingsForm, formEditProfil);

const popupAddCard = document.querySelector('.popup_addFoto');
const formAddCard = popupAddCard.querySelector('.popup__form');
const formAddCardValidation = new FormValidator(setingsForm, formAddCard);

const popupOpenFoto = document.querySelector('.popup_openFoto');
const popupFotoImg = popupOpenFoto.querySelector('.popup__foto');
const popupFotoTitle = popupOpenFoto.querySelector('.popup__foto-title');

//Валидация форм
formEditProfilValidation.enableValidation();
formAddCardValidation.enableValidation();

const saveEditForm = function (data) {
    userInfo.setUserInfo(data);
    popupWithEditForm.close();
}

const userInfo = new UserInfo(profileData);

const popupWithEditForm = new PopupWithForm(popupSelectors.editProfile, {
    submit: (data) => {
        saveEditForm(data);
    }
});

const popupWithAddForm = new PopupWithForm(popupSelectors.createCard, {
    submit: (data) => {
        popupWithAddForm.close();
        initCardList.addItem(createElement(data));
    }
});

const imagePopup = new PopupWithImage(popupSelectors.viewCard, imageData);
imagePopup.setEventListeners();

const initCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createElement(item);
        initCardList.addItem(cardElement);
    }
}, '.elements__list');

function createElement(item) {
    const elemt = new Card(item, '#new_card', {
        openedPopup: () => {
            imagePopup.open(item);
        }
    }
    );
    return elemt.createNewCard();
}

initCardList.rendererItem();

buttonEditProfil.addEventListener('click', () => {
    const userDate = userInfo.getUserInfo();
    nameProfil.value = userDate.name;
    jobProfil.value = userDate.info;
    popupWithEditForm.open(userDate);
    popupWithEditForm.setEventListeners();
    formEditProfilValidation.resetValidation();
});

buttonAddCard.addEventListener('click', () => {
    popupWithAddForm.open();
    popupWithAddForm.setEventListeners();
    formAddCardValidation.resetValidation();
});
