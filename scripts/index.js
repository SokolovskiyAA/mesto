const buttonEditProfil = document.querySelector('.profile__bnt_action_edit');
const buttonAddCard = document.querySelector('.profile__bnt_action_add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameProfil = document.querySelector('.popup__input_type_name');
const jobProfil = document.querySelector('.popup__input_type_aboutMy');

const newCardTemplate = document.querySelector('#new_card').content;
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
const popupFotoImg = popupOpenFoto.querySelector('.popup__foto');
const popupFotoTitle = popupOpenFoto.querySelector('.popup__foto-title');
const popupFotoCloseButton = popupOpenFoto.querySelector('.popup__bnt_action_close');



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
    popupClosed(popupEditProfil);
});

buttonAddCard.addEventListener('click', openPopupAdd);
buttonCloseCard.addEventListener('click', () => {
    popupClosed(popupAddCard);
});

popupFotoCloseButton.addEventListener('click', () => {
    popupClosed(popupOpenFoto);
});

function openPopupAdd() {
    formAddCard.reset();
    popupOpened(popupAddCard);
}

function openPopupFoto(fotoItem) {
    const nameFoto = fotoItem.closest('.card').querySelector('.card__title').textContent;
    popupFotoImg.src = fotoItem.src;
    popupFotoImg.alt = nameFoto;
    popupFotoTitle.textContent = nameFoto;
    popupOpened(popupOpenFoto);
}

function editProfile() {
    nameProfil.value = profileName.textContent;
    jobProfil.value = profileJob.textContent;
    popupOpened(popupEditProfil);
}

function popupOpened (popup) {
    popup.classList.add('popup_opened');
}

function popupClosed (popup) {
    popup.classList.remove('popup_opened');
}

const closeEditFormByClickOnOverlay = function (event) {

    if (event.target !== event.currentTarget)
        return;

        popupClosed(event.target);
}

const saveEditForm = function (event) {
    event.preventDefault();

    profileName.textContent = nameProfil.value;
    profileJob.textContent = jobProfil.value;
    popupClosed(popupEditProfil);
    //popupEditProfil.classList.remove('popup_opened');
}

function createNewCard(item) {
    newCard = newCardTemplate.cloneNode(true);
    newCard.querySelector('.card__image').src = item.link;
    newCard.querySelector('.card__image').alt = item.name;
    newCard.querySelector('.card__title').textContent = item.name;

    newCard.querySelector('.card__bnt_action_del').addEventListener('click', (event) => {
        event.target.closest('.card').remove();
    });

    newCard.querySelector('.card__bnt_action_like').addEventListener('click', (event) => {
        event.target.classList.toggle('card__bnt_clik_like');
    });

    newCard.querySelector('.card__image').addEventListener('click', (event) => {
        openPopupFoto(event.target);
    });

    return newCard
}

function renderNewCard(cardItem) {
    listCards.prepend(createNewCard(cardItem));
}

const saveAddForm = function (event) {
    event.preventDefault();
    renderNewCard({name: newCardName.value, link: newCardLink.value});
    popupClosed(popupAddCard);
}

initialCards.forEach((item) => {
    renderNewCard(item);
});

popupEditProfil.addEventListener('click', closeEditFormByClickOnOverlay);
popupAddCard.addEventListener('click', closeEditFormByClickOnOverlay);
popupOpenFoto.addEventListener('click', closeEditFormByClickOnOverlay);
formEditProfil.addEventListener('submit', saveEditForm);
formAddCard.addEventListener('submit', saveAddForm);