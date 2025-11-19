import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, submitCallBack }) {
    super({ popupSelector });
    this._submitCallBack = submitCallBack;
    this._form = document.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formValues = this._getInputValues();
      this._submitCallback(formValues);
    });
  }

  close() {
    super.close();
    this._form.reset(); // reset after close
  }
}

export default PopupWithForm;
