import Popup from './Popup.js';

export default class PopupWithDeleteCard extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popupElement.querySelector('.popup__form');
    }

    setCard(card) {
        this._card = card;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._card);
        });
    }
}