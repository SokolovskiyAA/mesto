const editButton = document.querySelector('.profile__bnt_action_edit');
const popup = document.querySelector('.popup');
const saveButton = popup.querySelector('.popup__bnt_action_save');
const closeButton = popup.querySelector('.popup__bnt_action_close');
const clikLikes = document.querySelectorAll('.card__like');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editName = document.querySelector('.popup__input_type_name');
const editJob = document.querySelector('.popup__input_type_aboutMy');
const formEditProfil = popup.querySelector('.popup__form');
const newCardTemplate = document.querySelector('#new_card').content;
const listCards = document.querySelector('.elements__list');

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

closeButton.addEventListener('click', closeEditForm);

function editProfile() {
    editName.value = profileName.textContent;
    editJob.value = profileJob.textContent;
    popup.classList.add('popup_opened');
}

function closeEditForm() {
    popup.classList.remove('popup_opened');
}

const closeEditFormByClickOnOverlay = function (event) {

    if (event.target !== event.currentTarget)
        return;

    closeEditForm();
}

const saveEditForm = function (event) {
    event.preventDefault();

    profileName.textContent = editName.value;
    profileJob.textContent = editJob.value;
    popup.classList.remove('popup_opened');
}

const createNewCard = function(item) {
    newCard = newCardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').src = item.link;
    newCard.querySelector('.card__title').textContent = item.name;

    listCards.prepend(newCard);
}

initialCards.forEach((item) => {
    createNewCard(item);
    // newCard = newCardTemplate.querySelector('.card').cloneNode(true);
    // newCard.querySelector('.card__image').src = item.link;
    // newCard.querySelector('.card__title').textContent = item.name;

    // listCards.append(newCard);
});

popup.addEventListener('click', closeEditFormByClickOnOverlay);

formEditProfil.addEventListener('submit', saveEditForm);