let editButton = document.querySelector('.profile__bnt_action_edit');
let saveButton = document.querySelector('.popup__bnt_action_save');
let closeButton = document.querySelector('.popup__bnt_action_close');
let popup = document.querySelector('.popup');
let clikLikes = document.querySelectorAll('.card__like');



editButton.addEventListener('click', editProfile);
saveButton.addEventListener('click', saveEditForm);
closeButton.addEventListener('click', closeEditForm);
clikLikes.forEach(clikLike => {
    clikLike.addEventListener('click', () => {
        clikLike.classList.toggle('card__like_clik');
    });
});

function editProfile() {
    let name = document.querySelector('.profile__name');
    let job = document.querySelector('.profile__job');
    let editName = document.querySelector('.popup__input_type_name');
    let editJob = document.querySelector('.popup__input_type_aboutMy');
    editName.value = name.textContent;
    editJob.value = job.textContent;
    popup.classList.add('popup_opened');
}

function saveEditForm() {
    document.querySelector('.profile__name').textContent = document.querySelector('.popup__input_type_name').value;
    document.querySelector('.profile__job').textContent = document.querySelector('.popup__input_type_aboutMy').value;
    popup.classList.remove('popup_opened');
}

function closeEditForm() {
    popup.classList.remove('popup_opened');
}


