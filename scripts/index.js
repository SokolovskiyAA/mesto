const editButton = document.querySelector('.profile__bnt_action_edit');
const addCardBatton = document.querySelector('.profile__bnt_action_add');
// const clikLikes = document.querySelectorAll('.card__like');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editName = document.querySelector('.popup__input_type_name');
const editJob = document.querySelector('.popup__input_type_aboutMy');

const newCardTemplate = document.querySelector('#new_card').content;
const listCards = document.querySelector('.elements__list');

const popupEdit = document.querySelector('.popup-edit');
const closeButtonProfel = popupEdit.querySelector('.popup__bnt_action_close');
const formEditProfil = popupEdit.querySelector('.popup__form');

const popupAddCard = document.querySelector('.popup-addFoto');
const closeButtonCard = popupAddCard.querySelector('.popup__bnt_action_close');
const formAddCard = popupAddCard.querySelector('.popup__form');
const newCardName = popupAddCard.querySelector('.popup__input_type_name');
const newCardLink = popupAddCard.querySelector('.popup__input_type_aboutMy');

const popupOpenFoto = document.querySelector('.popup-openFoto');
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

editButton.addEventListener('click', editProfile);
closeButtonProfel.addEventListener('click', () => {
    popupEdit.classList.remove('popup_opened');
});

addCardBatton.addEventListener('click', openPopupAdd);
closeButtonCard.addEventListener('click', () => {
    popupAddCard.classList.remove('popup_opened');
});

popupFotoCloseButton.addEventListener('click', () => {
    popupOpenFoto.classList.remove('popup_opened');
});

function openPopupAdd() {
    newCardName.value = '';
    newCardLink.value = '';
    popupOpened(popupAddCard);
}

function openPopupFoto(FotoItem) {
    popupFotoImg.src = FotoItem.src;
    popupFotoTitle.textContent = FotoItem.parentElement.querySelector('.card__title').textContent;
    popupOpened(popupOpenFoto);
}

function editProfile() {
    editName.value = profileName.textContent;
    editJob.value = profileJob.textContent;
    popupOpened(popupEdit);
}

function popupOpened (popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

const closeEditFormByClickOnOverlay = function (event) {

    if (event.target !== event.currentTarget)
        return;

        closePopup(event.target);
}

const saveEditForm = function (event) {
    event.preventDefault();

    profileName.textContent = editName.value;
    profileJob.textContent = editJob.value;
    closePopup(popupEdit);
    //popupEdit.classList.remove('popup_opened');
}

const saveAddForm = function (event) {
    event.preventDefault();

    const addItem =[
        {
            name: newCardName.value,
            link: newCardLink.value
        }
    ];

    createNewCard(addItem[0]);
    closePopup(popupAddCard);
}

function createNewCard(item) {
    newCard = newCardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').src = item.link;
    newCard.querySelector('.card__title').textContent = item.name;

    newCard.querySelector('.card__bnt_action_del').addEventListener('click', (event) => {
        event.target.parentElement.remove();
    });

    newCard.querySelector('.card__bnt_action_like').addEventListener('click', (event) => {
        event.target.classList.toggle('card__bnt_clik_like');
    });

    newCard.querySelector('.card__image').addEventListener('click', (event) => {
        openPopupFoto(event.target);
    });

    listCards.prepend(newCard);
}

initialCards.forEach((item) => {
    createNewCard(item);
});

popupEdit.addEventListener('click', closeEditFormByClickOnOverlay);
popupAddCard.addEventListener('click', closeEditFormByClickOnOverlay);
popupOpenFoto.addEventListener('click', closeEditFormByClickOnOverlay);
formEditProfil.addEventListener('submit', saveEditForm);
formAddCard.addEventListener('submit', saveAddForm);