import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from (this._popupForm.querySelectorAll('.popup__input'));
  }

//находим все данные ввода//
  _getInputValues(){ 
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value
    });
    return this._inputValues;
  };

    setEventListeners(){
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.closePopup();
    })
  };

  closePopup(){
    super.closePopup();
    this._popupForm.reset();
  };

}

