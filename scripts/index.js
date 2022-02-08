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

popup.addEventListener('click', closeEditFormByClickOnOverlay);

formEditProfil.addEventListener('submit', saveEditForm);