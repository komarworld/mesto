import "./../index.html";
import "./index.css"
 
import {
  avaEditBtn,
  profileName,
  profileJob,
  profileAvatar,
  cardAddBtn,
  formProfile,
  formAvatar,
  formDelete,
  nameInput,
  jobInput,
  formCard,
  cardsArr,
  validationConfig,
  editProfileBtn
} from "../utils/constants.js";
 
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js"
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithConfirmation from "../scripts/PopupWithConfirmation";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import {api} from "../scripts/Api.js"
 
 
const validatorEditProfile = new FormValidator(validationConfig, formProfile)
validatorEditProfile.enableValidation()
 
const validatorCardAdd = new FormValidator(validationConfig, formCard)
validatorCardAdd.enableValidation()
 
const validatorAvatar = new FormValidator(validationConfig, formAvatar)
validatorAvatar.enableValidation()
 
 
let userId;
 
// данные пользователя с сервера  
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatarInfo(userData);
    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));
 
 
const userInfo = new UserInfo({
  name:profileName,
  about:profileJob,
  avatar:profileAvatar
})
//==================POPUP Profile===============
 
const popupEditProfile = new PopupWithForm ('.popup_profile',handleProfileFormSubmit)
popupEditProfile.setEventListeners()
 
function handleProfileFormSubmit(userData) {
  popupEditProfile.renderLoading(true, "Сохраниние...");
  api
    .editProfile(userData)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .then(() => popupEditProfile.closePopup())
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditProfile.renderLoading(false);
    });
}
//открыть редактирование формы - 9 пр //
editProfileBtn.addEventListener ('click', ()=>{
  popupEditProfile.openPopup()                                                         
  const user= userInfo.getUserInfo()
  nameInput.value = user.name 
  jobInput.value = user.about 
  validatorEditProfile.resetValidation()          
}); 
 
//==================POPUP Avatar ===============
 
const popupEditAvatar = new PopupWithForm(".popup_avatar", handleAvatarFormSubmit);
popupEditAvatar.setEventListeners();
 
avaEditBtn.addEventListener("click", function () {
  popupEditAvatar.openPopup();
  validatorAvatar.resetValidation() 
});
 
function handleAvatarFormSubmit(data) {
  popupEditAvatar.renderLoading(true, "Сохраниние...");
  api
    .editProfileAvatar(data)
    .then((res) => {
      userInfo.setAvatarInfo(res);
    })
    .then(() => popupEditAvatar.closePopup())
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
}
 
//==================POPUP New Cards ===============
 
const popupAddCard = new PopupWithForm ('.popup_card', handleCardFormSubmit)
popupAddCard.setEventListeners()
 
//откртыие формы добавления карточки//
cardAddBtn.addEventListener ('click', ()=> {
  validatorCardAdd.resetValidation()
  popupAddCard.openPopup()
})
 
 
function handleCardFormSubmit (data) {
  popupAddCard.renderLoading(true, "Сохраниние...");
  api
    .addNewCard ({name: data["form-title"], link: data["form-link"]})
    .then((res) => {
      console.log('bbbbbb')
      const cardElement = createCard(res, ".template-cards");
      cardList.addItem(cardElement);
    })
    .then(() => popupAddCard.closePopup())
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
}
 
//================== Cards actions ===============
let cardList
 
cardList = new Section(
  {renderer: (item) => {
    const cardElement = createCard(item, ".template-cards");
    cardList.addItem(cardElement);
    },
  },
  '.cards__list'
);
 
 
// создаем карточку
const createCard = (data) => {
  const card = new Card(
    {
      data: data,
      userId: userId,
      openFullScreenPopup,
      handleLike: (cardId) => {
        if (card.isLiked()){ 
          api.deleteLike(cardId)
            .then((res) => {
              for (const property in res) {
                console.log(`${property}: ${res[property]}`);
              }
              card._likes = res; // Update the card's likes
              card.setLikes(); // Refresh the likes count
            })
            .catch((err) => console.log(err));
        } else { 
          api
            .addLike(cardId)
            .then(res => { 
              for (const property in res) {
                console.log(`${property}: ${res[property]}`);
              }
              card._likes = res; // Update the card's likes
              card.setLikes(); // Refresh the likes count
            })
            .catch((err) => console.log(err));
        }    
      },
 
      handleDeleteCard: (cardId, cards) => {
        popupDeleteCard.openPopup(cardId, cards);
        popupDeleteCard.handleSubmitAction((data) => {
          api
            .deleteCard(data.cardId)
            .then(() => {
              popupDeleteCard.closePopup();
              card.remove();
            })
            .catch((err) => {
              console.log('Error deleting', err);
            });
        });
      }
    },
    ".template-cards"
  );
  return card.generateCard();
};
 
 
//==================POPUP Delete Card ===============
 
const popupDeleteCard = new PopupWithConfirmation ('.popup_delete')
popupDeleteCard.setEventListeners()
 
 
//==================POPUP image full screen ===============
const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();
 
const openFullScreenPopup = (name, link) => {
  popupWithImage.openPopup(name, link)
  };



  //const cardElement = creatCard (
   // { name: inputValues['title'], link: inputValues['link'] });
 // sectionWithCards.addItem(cardElement);
 

/*
function creatCard (data) {
  const card= new Card (data, '.template-cards', openFullScreenPopup)
  
  const cardElement = card.generateCard()
  return cardElement
}


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