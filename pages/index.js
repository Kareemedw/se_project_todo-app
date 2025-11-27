import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";

import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";

import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  todoCounter.updateTotal(false);
  if (completed) todoCounter.updateCompleted(false);
}

const section = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    const todo = new Todo(
      todoData,
      "#todo-template",
      handleCheck,
      handleDelete
    );
    const todoElement = todo.getView();
    section.addItems(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  submitCallBack: (formValues) => {
    const id = uuidv4();
    const values = {
      name: formValues.name,
      date: formValues.date,
      id,
      completed: false,
    };

    todoCounter.updateTotal(true); // ADD ONE
    const todo = generateTodo(todosList);
    renderTodo(values);
  },
});

addTodoPopup.setEventListeners();

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const renderTodo = (item) => {
  const el = generateTodo(item);
  section.addItems(el);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoFormValidator = new FormValidator(validationConfig, addTodoForm);

newTodoFormValidator.enableValidation();
