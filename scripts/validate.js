
const showInputError = (formSettings, inputElement, errorMessage) => {
  const errorElement = inputElement.closest(formSettings.popupLabel).querySelector(formSettings.errorClass);
  inputElement.classList.add(formSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formSettings, inputElement) => {
  const errorElement = inputElement.closest(formSettings.popupLabel).querySelector(formSettings.errorClass);
  inputElement.classList.remove(formSettings.inputErrorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formSettings, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formSettings, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formSettings, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};


const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, formSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
  const buttonElement = formElement.querySelector(formSettings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    hideInputError(formSettings, inputElement);
    inputElement.addEventListener('input', function () {
      checkInputValidity(formSettings, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (formSettings) => {
  if (formSettings.formSelector !== null)
    setEventListeners(formSettings.formSelector, formSettings);
};