const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input ',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};


const showInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector (`.${inputElement.id}-error`)
  inputElement.classList.add(config.inputErrorClass)
  errorElement.textContent = inputElement.validationMessage
  errorElement.classList.add(config.errorClass)
  
}

const removeInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector (`.${inputElement.id}-error`)
  inputElement.classList.remove(config.inputErrorClass)
  errorElement.textContent = " "
  errorElement.classList.remove(config.errorClass)  
}

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid){
    showInputError (formElement, inputElement, config)
  }
  else {
    removeInputError(formElement,inputElement, config)
  }
 }
 const hasInvalidInput = (inputArr) =>{
  return inputArr.some((inputElement) => {
    return !inputElement.validity.valid
  })
}


const setEventListeners =(formElement, config)=> {
  const inputArr= Array.from(formElement.querySelectorAll(config.inputSelector))
  const SubmitButton = formElement.querySelector(config.submitButtonSelector)
  toggleButtonState (inputArr, SubmitButton, config) 

  inputArr.forEach((inputElement)=>{
  inputElement.addEventListener ('input', function(){
    checkInputValidity (formElement, inputElement, config )
    toggleButtonState (inputArr, SubmitButton, config) 
});
});
}


const toggleButtonState = (inputArr, SubmitButton, config) =>{
  if (hasInvalidInput(inputArr)) {
    SubmitButton.classList.add(config.inactiveButtonClass)
    SubmitButton.setAttribute ("disabled", true)
  }
  else {  
    SubmitButton.classList.remove(config.inactiveButtonClass)
    SubmitButton.removeAttribute("disabled")
  }
}


const formValidation = (config)=>{
const formArr =Array.from(document.querySelectorAll(config.formSelector))
formArr.forEach((formElement)=> {
  formElement.addEventListener ('submit', (evt)=> {
    evt.preventDefault();
  });
setEventListeners (formElement, config) 
});
}

formValidation (validationConfig);
