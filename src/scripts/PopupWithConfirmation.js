import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmBtn = this._popup.querySelector(".popup__submit-btn"); //кнопка
  }

  open(cardId, card) {
    super.openPopup();
    this._cardId = cardId;
    this._card = card;
  }

  handleSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}