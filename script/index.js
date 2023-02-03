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


const templateCard = document.querySelector ('.template-cards').content.querySelector ('.cards__item') //обращаемся к template//
const cardPlace = document.querySelector ('.cards__list')


const popupProfile = document.querySelector ('.popup_profile')
const formProfile = popupProfile.querySelector ('.popup__form')
const nameInput = popupProfile.querySelector ('.popup__input_name') 
const jobInput = popupProfile.querySelector ('.popup__input_job')
const closeProfileBtn = popupProfile.querySelector('.popup__close-btn')

const popupCard = document.querySelector ('.popup_card')
const formCard = popupCard.querySelector ('.popup__form')
const titleCardInput = popupCard.querySelector ('.popup__input_title')
const linkCardInput =popupCard.querySelector ('.popup__input_link')
const CardBtnClose = popupCard.querySelector ('.popup__close-btn')


const popupImage = document.querySelector ('.popup_image')
const ImageBtnClose = popupImage.querySelector ('.popup__close-btn')


//открытие popup//
function openPop (popup) {
  popup.classList.add('popup_opened');
};

//закрытие  popup//
function closePop (popup) {
  popup.classList.remove('popup_opened');
};


//открыть редактирование формы//
editProfile.addEventListener ('click', ()=>{
  openPop(popupProfile); 
  nameInput.value = profileName.textContent 
  jobInput.value = profileJob.textContent 
}); 

closeProfileBtn.addEventListener ('click', ()=> closePop (popupProfile)); //закрытие формы профайла//

//отправка формы//
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
  titleCardInput.value = ""
  linkCardInput.value = ""
});


cardAdd.addEventListener ('click', ()=> openPop(popupCard)); //откртыие формы карточки//
CardBtnClose.addEventListener ('click', ()=> closePop(popupCard)); //закрытие формы карточки//


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
    const popupImageIncrease = popupImage.querySelector('.popup__pic');
    openPop (popupImage);
    popupImageIncrease.src =item.link;
    popupImageIncrease.alt =item.name;
    popupImage.querySelector ('.popup__pic-caption').textContent = item.name
    });

    popupImage.querySelector('.popup__close-btn').addEventListener('click', ()=> // закрываем картинку
      closePop(popupImage));

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