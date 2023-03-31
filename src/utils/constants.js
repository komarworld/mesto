export const cardsArr = [
  {name: "Новороссийск",
  link: "./images/Pic_Novo.jpg",},

  {name: "Карачаево-Черкессия",
  link: "./images//Pic_Karacha.jpg",},

  {name: "Сочи",
  link: "./images/Pic_Soci.jpg",},

  {name: "гора Эльбрус",
  link: "./images/Pic_Elbrus.jpg",},

  {name: "Краснодар",
  link: "./images/Pic_Krasnodar.jpeg",},

  {name: "Псебай",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",},
]

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input ',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

export const editProfile = document.querySelector ('.profile__edit-button')
export const profileName = document.querySelector ('.profile__info-title')
export const profileJob = document.querySelector ('.profile__info-subtitle')
export const cardAdd = document.querySelector ('.profile__add-button')

export const templateCard = document.querySelector ('.template-cards').content.querySelector ('.cards__item') //обращаемся к template//
export const cardPlace = document.querySelector ('.cards__list')
export const cardName = templateCard.querySelector ('.cards__item-caption')


export const popupProfile = document.querySelector ('.popup_profile')
export const formProfile = document.forms['form-profile']
export const nameInput = popupProfile.querySelector ('.popup__input_name') 
export const jobInput = popupProfile.querySelector ('.popup__input_job')


export const popupCard = document.querySelector ('.popup_card')
export const formCard = document.forms['form-card']
export const titleCardInput = popupCard.querySelector ('.popup__input_title')
export const linkCardInput =popupCard.querySelector ('.popup__input_link')


export const popupImage = document.querySelector ('.popup_image')
export const popupImagePic = popupImage.querySelector('.popup__pic');
export const popupImageCaption = popupImage.querySelector('.popup__pic-caption');