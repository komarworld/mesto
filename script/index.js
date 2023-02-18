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

const editProfile = document.querySelector ('.profile__edit-button')
const profileName = document.querySelector ('.profile__info-title')
const profileJob = document.querySelector ('.profile__info-subtitle')
const cardAdd = document.querySelector ('.profile__add-button')

const closeBtns = (document.querySelectorAll('.popup__close-btn'))

const templateCard = document.querySelector ('.template-cards').content.querySelector ('.cards__item') //обращаемся к template//
const cardPlace = document.querySelector ('.cards__list')
const cardName = templateCard.querySelector ('.cards__item-caption')


const popupProfile = document.querySelector ('.popup_profile')
const formProfile = popupProfile.querySelector ('.popup__form')
const nameInput = popupProfile.querySelector ('.popup__input_name') 
const jobInput = popupProfile.querySelector ('.popup__input_job')


const popupCard = document.querySelector ('.popup_card')
const formCard = popupCard.querySelector ('.popup__form')
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
}); 

//закрытие любой формы //
closeBtns.forEach(function(button) {
  const popup = button.closest('.popup')
  button.addEventListener ('click', ()=> closePop (popup))
});

cardAdd.addEventListener ('click', ()=> openPop(popupCard)); //откртыие формы карточки//

//отправка формы профиля//
function handleFormSubmit (evt) {
  evt.preventDefault(); // отмена дефолтной отправки//
  profileName.textContent = nameInput.value //ввод данных//
  profileJob.textContent = jobInput.value //ввод данных//
  closePop(popupProfile)
};

formProfile.addEventListener ('submit', handleFormSubmit);   //слущатель отправки формы профиля//


//форма новой карты//
formCard.addEventListener ('submit', function (ev){
  ev.preventDefault(); 
  const newCardName = titleCardInput.value 
  const newCardLink = linkCardInput.value
  const card = createCard ({name:newCardName, link:newCardLink})
  cardPlace.prepend (card)
  closePop (popupCard)
  ev.target.reset()
});


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
    
    openPop (popupImage);
    popupImagePic.src =item.link;
    popupImagePic.alt =item.name;
    popupImageCaption.textContent = item.name
    });

    return card;
};

 //добавляем 6 карточек из массива//
function renderCards (item) {
  const cards = cardsArr.map((item) => {
    return createCard (item)
  });
  cardPlace.append (...cards)
  }

renderCards (cardsArr);

//закрытие по esc//
function closeByEscape(evt) {  
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePop(openedPopup)
  }
}
const popups = document.querySelectorAll(".popup")
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePop(popup)
    }
  })
  });