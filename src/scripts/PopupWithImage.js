import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__pic');
    this._caption = this._popup.querySelector('.popup__pic-caption');
};

openPopup(name, link) {
    super.openPopup() 
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
  };
}