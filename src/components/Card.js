
export default class Card {
    constructor(item, cardTemplate, { openedPopup }) {
        this._name = item.name;
        this._link = item.link;
        this._templateClass = cardTemplate;
        this._openedPopup = openedPopup;
    }

    createNewCard() {
        this._element = this._getTemplate();
        
        const cardImage = this._element.querySelector('.card__image');
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;
        this._setEventListeners();
        
        return this._element;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateClass).content.querySelector('.elements__card').cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.card__bnt_action_like');
        this._element.querySelector('.card__bnt_action_like').addEventListener('click', () => this._setEventLikeCard());
        this._element.querySelector('.card__bnt_action_del').addEventListener('click', () => this._setEventDeleteCard());
        this._element.querySelector('.card__image').addEventListener('click', () => this._openedPopup(this._link, this._name));
    }

    _setEventLikeCard() {
        this._likeButton.classList.toggle('card__bnt_clik_like');
    }

    _setEventDeleteCard() {
        this._element.remove();
    }
}