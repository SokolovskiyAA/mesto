import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteCard from '../components/PopupWithDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { setingsForm, initialCards, popupSelectors, imageData, profileData } from '../utils/constants.js';

const buttonEditProfil = document.querySelector('.profile__bnt_action_edit');
const buttonEditAvatarProfil = document.querySelector('.profile__bnt_action_edit-avatar');
const buttonAddCard = document.querySelector('.profile__bnt_action_add');
const nameProfil = document.querySelector('.popup__input_type_name');
const jobProfil = document.querySelector('.popup__input_type_aboutMy');

const popupEditProfil = document.querySelector('.popup_editProfile');
const formEditProfil = popupEditProfil.querySelector('.popup__form');
const formEditProfilValidation = new FormValidator(setingsForm, formEditProfil);

const popupEditAvatarProfil = document.querySelector('.popup_editAvatar');
const formEditAvatar = popupEditAvatarProfil.querySelector('.popup__form');
const formEditAvatarValidation = new FormValidator(setingsForm, formEditAvatar);

const popupAddCard = document.querySelector('.popup_addFoto');
const formAddCard = popupAddCard.querySelector('.popup__form');
const formAddCardValidation = new FormValidator(setingsForm, formAddCard);

const popupOpenFoto = document.querySelector('.popup_openFoto');
const popupFotoImg = popupOpenFoto.querySelector('.popup__foto');
const popupFotoTitle = popupOpenFoto.querySelector('.popup__foto-title');

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
    headers: {
        authorization: '53287636-91f5-48f9-9212-a7c962d58563',
        'Content-Type': 'application/json'
    }
});

//Валидация форм
formEditProfilValidation.enableValidation();
formAddCardValidation.enableValidation();
formEditAvatarValidation.enableValidation();
//


const userInfo = new UserInfo(profileData);

const popupWithEditForm = new PopupWithForm(popupSelectors.editProfile, (data) => {
    popupWithEditForm.renderLoading(true);
    api.updateUserInfo({ name: data.name, about: data.info })
        .then((res) => {
            userInfo.setUserInfo(res);
            popupWithEditForm.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupWithEditForm.renderLoading(false);
        });
});

const popupWithAddForm = new PopupWithForm(popupSelectors.createCard, (data) => {
    popupWithAddForm.renderLoading(true);
    api.addNewCard({ name: data.name, link: data.link })
        .then((res) => {
            initCardList.addItem(createElement(res));
            popupWithAddForm.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupWithAddForm.renderLoading(false);
        });
});

const popupEditAvatar = new PopupWithForm(popupSelectors.editAvatar, (data) => {
    popupEditAvatar.renderLoading(true);
    api.updateUserAvatar({ avatar: data.avatarLink })
        .then((res) => {
            userInfo.setUserAvatar(res.avatar);
            popupEditAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupEditAvatar.renderLoading(false);
        });

});

const popupDeleteCard = new PopupWithDeleteCard(popupSelectors.deleteCard, (card) => {
    api.deleteCard(card.getCardId())
        .then(() => {
            card.remove();
            popupDeleteCard.close();
        })
        .catch((err) => {
            console.log(err);
        })
});

popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

const imagePopup = new PopupWithImage(popupSelectors.viewCard, imageData);

api.getBaseData()
    .then((res) => {
        const [cards, user] = res;
        userInfo.setUserInfo(user);
        userInfo.setUserAvatar(user.avatar);
        userInfo.setCurrentUserId(user._id);
        initCardList.renderItem(cards.reverse());
    })
    .catch((err) => {
        console.error(err);
    });

const initCardList = new Section({
    renderer: (item) => {
        const cardElement = createElement(item);
        initCardList.addItem(cardElement);
    }
}, '.elements__list');


function createElement(item) {
    const elemt = new Card(item,
        userInfo.getCurrentUserId(),
        '#new_card',
        () => {
            imagePopup.open(item);
        },
        () => {
            popupDeleteCard.setCard(elemt);
            popupDeleteCard.open();
        },
        () => {
            if (elemt.hasLike()) {
                api.dislikeCard(elemt.getCardId())
                    .then((res) => {
                        elemt.dislike();
                        elemt.updateLikes(res.likes);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            else {
                api.likeCard(elemt.getCardId())
                    .then((res) => {
                        elemt.like();
                        elemt.updateLikes(res.likes);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    );
    return elemt.createNewCard();
}

//initCardList.rendererItem();

buttonEditProfil.addEventListener('click', () => {
    const userDate = userInfo.getUserInfo();
    nameProfil.value = userDate.name;
    jobProfil.value = userDate.info;
    formEditProfilValidation.resetValidation();
    popupWithEditForm.open();
});

buttonAddCard.addEventListener('click', () => {
    formAddCardValidation.resetValidation();
    popupWithAddForm.open();
});

buttonEditAvatarProfil.addEventListener('click', () => {
    formEditAvatarValidation.resetValidation();
    popupEditAvatar.open();
});
