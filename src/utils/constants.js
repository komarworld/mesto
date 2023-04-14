const Novo =new URL("../images/Pic_Novo.jpg", import.meta.url)
const Karachaevo = new URL("../images//Pic_Karacha.jpg", import.meta.url)
const Sochi =new URL("../images/Pic_Soci.jpg", import.meta.url)
const Elbrus =new URL("../images/Pic_Elbrus.jpg", import.meta.url)
const Psebai =new URL("../images/Pic_Psebai.jpg", import.meta.url)
const Krasnodar =new URL("../images/Pic_Krasnodar.jpeg", import.meta.url)


export const cardsArr = [
  {name: "Новороссийск",
  link: Novo,},

  {name: "Карачаево-Черкессия",
  link: Karachaevo},

  {name: "Сочи",
  link: Sochi},

  {name: "гора Эльбрус",
  link: Elbrus},

  {name: "Краснодар",
  link: Krasnodar},

  {name: "Псебай",
  link: Psebai},
]

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input ',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

export const avaEditBtn = document.querySelector('.profile__avatar-wrap')
export const profileAvatar = document.querySelector('.profile__avatar')

export const editProfileBtn = document.querySelector ('.profile__edit-button')
export const profileName = document.querySelector ('.profile__info-title')
export const profileJob = document.querySelector ('.profile__info-subtitle')


export const cardAddBtn = document.querySelector ('.profile__add-button')
export const cardPlace = document.querySelector ('.cards__list')

export const templateCard = document.querySelector ('.template-cards').content.querySelector ('.cards__item') //обращаемся к template//
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

export const popupAvatar = document.querySelector('.popup_avatar')
export const formAvatar = document.forms['form-ava']


export const popupDelete = document.querySelector('.popup_delete')
export const formDelete = document.forms['form-delete'];


