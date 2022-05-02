/* eslint-disable max-classes-per-file */
import './style.css';
import ToDos from './modules/todos.js';
import NewToDos from './modules/display.js';

const selector = (element) => document.querySelector(element);
const selectorAll = (element) => document.querySelectorAll(element);
const input = selector('input');
const newTodo = new ToDos();

const updateTodo = (event, index, focus = false) => {
  if (event.key === 'Enter' || focus) {
    newTodo.updateTodo(
      index,
      selector(`.task_${index}`).value,
      selector(`.task_${index}_checkbox`).checked,
    );
    selector('.new-list input').focus();
  }
};

const updateStatus = (index) => {
  newTodo.updateStatus(index, selector(`.task_${index}_checkbox`).checked);
  selector(`.task[data-id='${index}'] .input_task`).classList.toggle(
    'completed',
  );
};

const display = () => {
  NewToDos.reset(selector('.display'));

  newTodo
    .getTodos()
    .forEach((todo) => NewToDos.displayTask(selector('.display'), todo));

  selectorAll('.fa-trash').forEach((elem) => elem.addEventListener('click', () => {
    // eslint-disable-next-line no-use-before-define
    deleteTodo(elem.dataset.id);
  }));

  selectorAll('.input_task').forEach((elem) => elem.addEventListener('keyup', (event) => {
    updateTodo(event, elem.dataset.id);
  }));

  selectorAll('.checkbox_task').forEach((elem) => elem.addEventListener('change', () => {
    updateStatus(elem.dataset.id);
  }));
};

const deleteTodo = (index) => {
  newTodo.deleteTodo(index);
  display();

  selectorAll('.input_task').forEach((elem) => elem.addEventListener('keyup', (event) => {
    updateTodo(event, elem.dataset.id);
  }));

  selectorAll('.input_task').forEach((elem) => elem.addEventListener('focusout', (event) => {
    updateTodo(event, elem.dataset.id, true);
  }));
};

const createTodo = () => {
  const todo = newTodo.addTodo(input.value);
  NewToDos.displayTask(selector('.display'), todo);
  input.value = '';

  selector(`#task_${todo.index}`).addEventListener('click', () => {
    deleteTodo(todo.index);
  });

  selector(`#input_task_${todo.index}`).addEventListener('keyup', (event) => {
    updateTodo(event, todo.index);
  });

  selector(`#input_task_${todo.index}`).addEventListener(
    'focusout',
    (event) => {
      updateTodo(event, todo.index, true);
    },
  );

  selector(`#checkbox_task_${todo.index}`).addEventListener('change', () => {
    updateStatus(todo.index);
  });

  selector(`#input_task_${todo.index}`).focus();
};

selector('.clear').addEventListener('click', () => {
  newTodo.clearCompleted();
  display();
});

input.addEventListener('keyup', ({ key }) => {
  if (key === 'Enter') {
    createTodo();
  }
});

selector('.fa-level-down-alt').addEventListener('click', () => createTodo());

display();