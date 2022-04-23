
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popupElement.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitHandler = this._submitHandler.bind(this);
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    _submitHandler(evt) {
        evt.preventDefault();
        this._submit(this._getInputValues());
    }

    setEventListeners() {
        this._form.addEventListener('submit', this._submitHandler);
    }

    close() {
        super.close();
        this._form.reset();
    }
}