export default class Card {
  constructor(data, templateSelector, openFullScreenPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openFullScreenPopup = openFullScreenPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);

    return cardElement;
  }

  _removeElement() {
    this._element.remove();
  }

  _toggleLikeButton() {
    this._btnLike.classList.toggle('cards__item-like_active');
  }

  _setEventListeners() {
    this._element.querySelector('.cards__item-delete').addEventListener('click', () => {
    this._removeElement()
  })

  this._btnLike = this._element.querySelector('.cards__item-like');  
  this._btnLike.addEventListener('click', () => {
    this._toggleLikeButton();
  })

  this._element.querySelector('.cards__item-image').addEventListener('click', () => {
    this._openFullScreenPopup(this._name, this._link);
  })
}

generateCard() {
  this._element = this._getTemplate();
  this._setEventListeners();

  this._cardImg = this._element.querySelector('.cards__item-image');
  this._cardImg.src = this._link;
  this._cardImg.alt = this._name;
  this._cardTitle = this._element.querySelector('.cards__item-caption');
  this._cardTitle.textContent = this._name;

  return this._element;
}

}