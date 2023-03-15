export default class FormValidator {
  constructor (config, formElement) {
    this._validationConfig = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    this._submitButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    this._inputErrorClass = this._validationConfig.inputErrorClass;
    this._errorClass = this._validationConfig.errorClass;
  }

  _showInputError (inputElement) {
    const errorElement = this._formElement.querySelector(
        `.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  };

  _removeInputError (inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass)
    errorElement.textContent = ""
    errorElement.classList.remove(this._validationConfig.errorClass)  
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid){
      this._showInputError (inputElement)
    }
    else {
      this._removeInputError(inputElement)
    }
  }

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }
  
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._validationConfig.inactiveButtonClass)
      this._submitButton.setAttribute ("disabled", true)
    }
    else {  
      this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass)
      this._submitButton.removeAttribute("disabled")
    }
  }
  
  resetValidation () {
    this._toggleButtonState () 
  
    this._inputList.forEach((inputElement) => {
      this._removeInputError(inputElement)
    }) 
  };

  _setEventListeners () {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState();
      });
    });
  }

  enableValidation () {
    this._setEventListeners()
  }

}

/* ПР6
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

const setEventListeners = (formElement, config)=> {
  const inputArr= Array.from(formElement.querySelectorAll(config.inputSelector))
  const submitButton = formElement.querySelector(config.submitButtonSelector)
  toggleButtonState (inputArr, submitButton, config) 

  inputArr.forEach((inputElement)=>{
  inputElement.addEventListener ('input', function(){
    checkInputValidity (formElement, inputElement, config )
    toggleButtonState (inputArr, submitButton, config) 
});
});
}


const resetValidation = (formElement, config) => {
  const inputArr= Array.from(formElement.querySelectorAll(config.inputSelector))
  const submitButton = formElement.querySelector(config.submitButtonSelector)
  toggleButtonState (inputArr, submitButton, config) 

  inputArr.forEach((inputElement) => {
    removeInputError(formElement, inputElement, config)
  }) 
};


const hasInvalidInput = (inputArr) =>{
  return inputArr.some((inputElement) => {
    return !inputElement.validity.valid
  })
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

const toggleButtonState = (inputArr, submitButton, config) =>{
  if (hasInvalidInput(inputArr)) {
    submitButton.classList.add(config.inactiveButtonClass)
    submitButton.setAttribute ("disabled", true)
  }
  else {  
    submitButton.classList.remove(config.inactiveButtonClass)
    submitButton.removeAttribute("disabled")
  }
}


formValidation (validationConfig);
*/
