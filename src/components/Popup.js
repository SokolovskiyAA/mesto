
export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleClickClose = this._handleClickClose.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        this._popupElement.addEventListener('mousedown', this._handleClickClose);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        if (this._popupElement) {
            this._popupElement.classList.remove('popup_opened');
            this._popupElement.removeEventListener('mousedown', this._handleClickClose);
            document.removeEventListener('keydown', this._handleEscClose);
        }
    }

    _handleEscClose(evt) {
        if (evt.key == 'Escape')
            this.close();
    }

    _handleClickClose(evt) {
        if (evt.target.classList.contains('popup__bnt_action_close') || evt.target.classList.contains('popup')) {
            this.close();
        }
    }
}