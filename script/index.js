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

const closeBtn = (document.querySelectorAll('.popup__close-btn'))

const templateCard = document.querySelector ('.template-cards').content.querySelector ('.cards__item') //обращаемся к template//
const cardPlace = document.querySelector ('.cards__list')


const popupProfile = document.querySelector ('.popup_profile')
const formProfile = popupProfile.querySelector ('.popup__form')
const nameInput = popupProfile.querySelector ('.popup__input_name') 
const jobInput = popupProfile.querySelector ('.popup__input_job')


const popupCard = document.querySelector ('.popup_card')
const formCard = popupCard.querySelector ('.popup__form')
const titleCardInput = popupCard.querySelector ('.popup__input_title')
const linkCardInput =popupCard.querySelector ('.popup__input_link')



const popupImage = document.querySelector ('.popup_image')
const popupPicIncrease = popupImage.querySelector('.popup__pic');

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

closeBtn.forEach(function(button) {
  const popup = button.closest('.popup')
  button.addEventListener ('click', ()=> closePop (popup))
}); //закрытие любой формы //

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
    popupPicIncrease.src =item.link;
    popupPicIncrease.alt =item.name;
    popupImage.querySelector ('.popup__pic-caption').textContent = item.name
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