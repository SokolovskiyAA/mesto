

export default class FormValidator {
    constructor(itemValidateForm, formElement) {
        this._formElement = formElement;
        this._inputSelector = itemValidateForm.inputSelector;
        this._submitButtonSelector = itemValidateForm.submitButtonSelector;
        this._inputErrorClass = itemValidateForm.inputErrorClass;
        this._errorClass = itemValidateForm.errorClass;
        this._errorClassActiv = itemValidateForm.errorClassActiv;
        this._popupLabel = itemValidateForm.popupLabel;
    }

    enableValidation() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        this._toggleButtonState();
        this._setEventListeners();
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute('disabled', true);
        }
        else {
            this._buttonElement.removeAttribute('disabled');
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        })
      };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement) {
        const errorElement = inputElement.closest(this._popupLabel).querySelector(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = inputElement.closest(this._popupLabel).querySelector(this._errorClass);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    }

    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
          });
    }
}