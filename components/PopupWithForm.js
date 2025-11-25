import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, submitCallBack }) {
    super({ popupSelector });
    this._submitCallBack = submitCallBack;
    this._form = this._popup.querySelector(".popup__form");
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
      this._submitCallBack(formValues);
      const name = evt.target.name.value;
      const dateInput = evt.target.date.value;

      // Create a date object and adjust for timezone
      const date = new Date(dateInput);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

      this._form.reset();
      this.close();
    });
  }
}

export default PopupWithForm;
