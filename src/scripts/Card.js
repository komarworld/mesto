export default class Card {
  constructor(
      { data, userId, openFullScreenPopup, handleLike, handleDeleteCard },
      templateSelector
    ) {
      this._data = data;
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._cardId = data._id; //id карточки
      this._ownerId = data.owner._id; // id владельца карточки
      this._userId = userId; // id пользователя 
      this._openFullScreenPopup = openFullScreenPopup;
      this._handleLike = handleLike;
      this._handleDeleteCard = handleDeleteCard;
      this._templateSelector = templateSelector;
    
    }
 
 
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);
 
    return cardElement;
 
  }
 
  generateCard() {
    this._element = this._getTemplate();
 
    this._cardImg = this._element.querySelector('.cards__item-image');
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardTitle = this._element.querySelector('.cards__item-caption');
    this._cardTitle.textContent = this._name;
 
    this._setEventListeners();
    this.setLikes(this._likes);
    this._checkUser();
 
    return this._element;
  }
 
 
  setLikes(likeArr) {
    this._likes = likeArr// Save likes to class field
    this._likeSum = this._element.querySelector(".cards__item-like-sum");
    this._likeSum.textContent = this._likes.length;
 
 
    if (this.isLiked()) {
 
      this._like();
    } else {
 
      this._dislike();
    }
  }
 
 
 
  _like() {
    this._likeBtn.classList.add("cards__item-like_active");
 
  }
 
  _dislike() {
    this._likeBtn.classList.remove('cards__item-like_active');
  }
 
  isLiked(){
    if (this._likes.find(user => user._id === this._userId)){
      return true
    } else return false
   
  }
 
  remove() {
    this._element.remove();
    this._elementCard = null;
  }
 
  _setEventListeners() {
    this._trashBtn = this._element.querySelector('.cards__item-delete')
    this._trashBtn.addEventListener('click', () => {
    this._handleDeleteCard(this._cardId, this)
  })
 
    this._likeBtn = this._element.querySelector('.cards__item-like');  
    this._likeBtn.addEventListener('click', () => {
    this._handleLike(this._cardId);
  })
 
 
    this._cardImg.addEventListener('click', () => {
    this._openFullScreenPopup(this._name, this._link);
  })
}
 
  _checkUser() {
    if (this._ownerId !== this._userId) {
      this._trashBtn.remove();
  }
}
 
}