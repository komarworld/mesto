
let editProfile = document.querySelector('.profile__edit-button')
let popupElement = document.querySelector('.popup')
let formElement = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__info-title')
let profileJob = document.querySelector('.profile__info-subtitle')

let nameInput = popupElement.querySelector('.popup__input_type_name') 
let jobInput = popupElement.querySelector('.popup__input_type_job')
let closePopup = popupElement.querySelector('.popup__close-btn')



function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closeClick ()
}

function editClick () {
  popupElement.classList.add('popup_opened');
  console.dir(popupElement)  
}

function closeClick () {
  popupElement.classList.remove('popup_opened');
}


formElement.addEventListener('submit', handleFormSubmit);
editProfile.addEventListener('click', editClick);
closePopup.addEventListener('click',closeClick )