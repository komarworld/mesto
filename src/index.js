import './page/index.css'

import {
  editProfile,
  profileName,
  profileJob,
  cardAdd,
  formProfile,
  nameInput,
  jobInput,
  formCard,
  cardsArr,
  validationConfig
} from "./utils/constants.js";

import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js"
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import Section from "./scripts/Section.js";
import UserInfo from "./scripts/UserInfo.js";



const validatorEditProfile = new FormValidator(validationConfig, formProfile)
validatorEditProfile.enableValidation()

const validatorCardAdd = new FormValidator(validationConfig, formCard)
validatorCardAdd.enableValidation()

const popupEditProfile = new PopupWithForm ('.popup_profile',handleProfileFormSubmit)
popupEditProfile.setEventListeners()

const popupAddCard = new PopupWithForm ('.popup_card', handleCardFormSubmit)
popupAddCard.setEventListeners()

const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  userName:profileName,
  userJob:profileJob,
})

//открыть редактирование формы - 9 пр //
editProfile.addEventListener ('click', ()=>{
const validatorEditProfile = new FormValidator(validationConfig, formProfile)
  popupEditProfile.openPopup()                                                         
  const user= userInfo.getUserInfo()
  nameInput.value = user.name 
  jobInput.value = user.job 
  validatorEditProfile.resetValidation()          
}); 

function handleProfileFormSubmit (inputValues) {
  userInfo.setUserInfo(inputValues["name"],inputValues["job"]);
}



function creatCard (data) {
  const card= new Card (data, '.template-cards', openFullScreenPopup)
  
  const cardElement = card.generateCard()
  return cardElement
}


const openFullScreenPopup = (name, link) => {
  popupWithImage.openPopup(name, link)
  };


const sectionWithCards = new Section(
  { items: cardsArr,
    renderer: (item) => {
      const cardElement = creatCard (item);
      sectionWithCards.addItem(cardElement);
    },
  },'.cards__list');

sectionWithCards.renderItems();


function handleCardFormSubmit (inputValues) {
  const cardElement = creatCard (
    { name: inputValues['title'], link: inputValues['link'] });
  sectionWithCards.addItem(cardElement);
 
}
//откртыие формы добавления карточки//
cardAdd.addEventListener ('click', ()=> {
  formCard.reset()
  validatorCardAdd.resetValidation()
  popupAddCard.openPopup()
})











/*отправка формы новой карты
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
*/


/* прошлый варинт добавления 6 карточек
function renderCards (item) {
  const cards = cardsArr.forEach((item) => {
    return createCard (item)
  });
  cardPlace.append (...cards)
  }
*/
  

/*закрытие по esc ПР8 БОЛЬШЕ НЕ НУЖНО
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePop(openedPopup)
  }
}


/*overlay и закрытие по крестику
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
*/


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