import Card from "./Card.js";

import FormValidator from "./FormValidator.js"

const cardsArr = [
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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input ',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const editProfile = document.querySelector ('.profile__edit-button')
const profileName = document.querySelector ('.profile__info-title')
const profileJob = document.querySelector ('.profile__info-subtitle')
const cardAdd = document.querySelector ('.profile__add-button')

const templateCard = document.querySelector ('.template-cards').content.querySelector ('.cards__item') //обращаемся к template//
const cardPlace = document.querySelector ('.cards__list')
const cardName = templateCard.querySelector ('.cards__item-caption')


const popupProfile = document.querySelector ('.popup_profile')
const formProfile = document.forms['form-profile']
const nameInput = popupProfile.querySelector ('.popup__input_name') 
const jobInput = popupProfile.querySelector ('.popup__input_job')


const popupCard = document.querySelector ('.popup_card')
const formCard = document.forms['form-card']
const titleCardInput = popupCard.querySelector ('.popup__input_title')
const linkCardInput =popupCard.querySelector ('.popup__input_link')


const popupImage = document.querySelector ('.popup_image')
const popupImagePic = popupImage.querySelector('.popup__pic');
const popupImageCaption = popupImage.querySelector('.popup__pic-caption');


//открытие popup//
function openPop (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);   
};

//закрытие  popup//
function closePop (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
};

//открыть редактирование формы//
editProfile.addEventListener ('click', ()=>{
  openPop(popupProfile); 
  nameInput.value = profileName.textContent 
  jobInput.value = profileJob.textContent 
  validatorEditProfile.resetValidation()          
}); 

//отправка формы профиля//  
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // отмена дефолтной отправки//
  profileName.textContent = nameInput.value //ввод данных//
  profileJob.textContent = jobInput.value //ввод данных//
  closePop(popupProfile)
};

formProfile.addEventListener ('submit', handleProfileFormSubmit);   //слущатель отправки формы профиля//


 //откртыие формы добавления карточки//
 cardAdd.addEventListener ('click', ()=> {
  formCard.reset()
  validatorCardAdd.resetValidation()
  openPop(popupCard)
})

function openFullScreenPopup (name, link) {
  popupImagePic.src = link;
  popupImagePic.alt = name;
  popupImageCaption.textContent = name
  openPop (popupImage);
  };


function creatCard (data, templateSelector, openFullScreenPopup){
  const card= new Card (data, templateSelector, openFullScreenPopup)
  const cardElement = card.generateCard()

  return cardElement
}

//отправка формы новой карты//
formCard.addEventListener ('submit', function (ev){
  ev.preventDefault(); 
  const data = {};
  data.name = titleCardInput.value; 
  data.link = linkCardInput.value;
  cardPlace.prepend(creatCard(data, '.template-cards', openFullScreenPopup))
  closePop (popupCard)
  ev.target.reset()
});

 //добавляем 6 карточек из массива//
function renderCards () {
  cardsArr.forEach (function(item){
    const newCard = creatCard(item, '.template-cards', openFullScreenPopup)
    cardPlace.append(newCard);
  })
}
renderCards();

/* прошлый варинт добавления 6 карточек
function renderCards (item) {
  const cards = cardsArr.forEach((item) => {
    return createCard (item)
  });
  cardPlace.append (...cards)
  }
*/
  
//закрытие по esc//
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePop(openedPopup)
  }
}

/*overlay и закрытие по крестику*/
const popups = document.querySelectorAll(".popup")
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePop(popup)
    }
    if (evt.target.classList.contains('popup__close-btn')) {
      closePop(popup)
    }
  })
  });


const validatorEditProfile = new FormValidator(validationConfig, formProfile)
validatorEditProfile.enableValidation()

const validatorCardAdd = new FormValidator(validationConfig, formCard)
validatorCardAdd.enableValidation()




/* старая версия создания карточки
// создание карточки //
function createCard (item) {
  const card = templateCard.cloneNode(true)
  const cardImage = card.querySelector('.cards__item-image')
  cardImage.src = item.link;
  cardImage.alt = item.name;
  card.querySelector('.cards__item-caption').textContent = item.name;
  
  
  //удаление карточки//
  card.querySelector('.cards__item-delete').addEventListener ('click', ()=> 
  card.remove());

  //like//
  const likeAction = card.querySelector('.cards__item-like')
  likeAction.addEventListener('click', () => 
    likeAction.classList.toggle('cards__item-like_active')
  );

  //увеличение карточки//
  card.querySelector('.cards__item-image').addEventListener('click',() =>{
     
  popupImagePic.src =item.link;
  popupImagePic.alt =item.name;
  popupImageCaption.textContent = item.name
  openPop (popupImage);
  });

  return card;
};

*/