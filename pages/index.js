import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";

import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";

import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopups = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopups.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopups.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

const section = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    const todo = new Todo(todoData, "#todo-template");
    const todoElement = todo.getView();
    section.additems(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  submitCallBack: () => {},
  /*const { name, date } = formValues;

  // timezone
  const dateObj = new Date(date);
  if (!isNaN(dateObj)) {
    dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());
  }

  const newTodoData = {
    id: uuidv4(),
    name,
    date: dateObj,
    completed: false,
  };

  const todoElement = createTodoElement(newTodoData);
  section.additems(todoElement);

  // update counter
  todoCounter.updateTotal(true);*/
});

//addTodoPopup.setEventListeners();

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck);
  const todoElement = todo.getView();
  return todoElement;
};

const renderTodo = (item) => {
  const el = generateTodo(item);
  todosList.append(el);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopup.close();
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  renderTodo(values);
  newTodoFormValidator.resetValidation();
  closeModal(addTodoPopups);
});

const newTodoFormValidator = new FormValidator(validationConfig, addTodoForm);

newTodoFormValidator.enableValidation();

//const newPopup = new Popup();
