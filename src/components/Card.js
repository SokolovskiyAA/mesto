
export default class Card {
    constructor(item, currentUserId, cardTemplate, openedPopup, removeCard, likeCard) {
        this._name = item.name;
        this._link = item.link;
        this._cardId = item._id;
        this._cardLikes = item.likes;
        this._cardOwnerId = item.owner._id;
        this._currentUserId = currentUserId;
        this._templateClass = cardTemplate;
        this._openedPopup = openedPopup;
        this._removeCard = removeCard;
        this._likeCard = likeCard;
        this._hasLike = this._cardLikes.some((user) => { return user._id === this._currentUserId; });
    }

    createNewCard() {
        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector('.card__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;

        this._likeCounter = this._element.querySelector('.card__like-counter');
        this._likeButton = this._element.querySelector('.card__bnt_action_like');
        this._deleteButton = this._element.querySelector('.card__bnt_action_del');

        this._likeCounter.textContent = this._cardLikes.length;
        if (this._cardOwnerId !== this._currentUserId) {
            this._deleteButton.remove();
        }
        
        if (this._hasLike) {            
            this.like();
        }
        else {
            this.dislike();
        }

        this._setEventListeners();

        return this._element;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateClass).content.querySelector('.elements__card').cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._likeCard());
        this._deleteButton.addEventListener('click', () => this._removeCard());
        this._cardImage.addEventListener('click', () => this._openedPopup());
    }

    // _setEventLikeCard() {
    //     this._likeButton.classList.toggle('card__bnt_clik_like');
    // }

    _setEventDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _handleLikeButton() {
        this._likeButton.classList.add('card__bnt_clik_like');
    }

    _handleDislikeButton() {
        this._likeButton.classList.remove('card__bnt_clik_like');
    }

    remove() {
        this._element.remove();
        this._element = null;
    }

    hasLike() {
        return this._hasLike;
    }

    like() {
        this._handleLikeButton();
        this._hasLike = true;
    }

    dislike() {
        this._handleDislikeButton();
        this._hasLike = false;
    }

    updateLikes(likes) {
        this._cardLikes = likes;
        this._likeCounter.textContent = this._cardLikes.length;
    }

    getCardId() {
        return this._cardId;
    }
}