/* eslint-disable max-classes-per-file */
import Task from './todo.js';
import Storage from './storage.js';
import BooleanTodo from './boolean.js';

export default class ToDos {
  constructor() {
    this.todos = Storage.load();
  }

  getTodos = () => this.todos.sort((first, second) => first.index - second.index);

  getTodo = (index) => this.todos[index - 1];

  addTodo = (details, completed = false) => {
    const newTask = new Task(this.todos.length + 1, details, completed);
    this.todos.push(newTask);
    Storage.save(this.todos);
    return newTask;
  };

  deleteTodo = (index) => {
    const newTasks = [];
    const taskIndex = index - 1;

    this.todos.forEach((t, i) => {
      if (i < taskIndex) {
        newTasks.push(t);
      } else if (i > taskIndex) {
        t.index = i;
        newTasks.push(t);
      }
    });
    this.todos = newTasks;
    Storage.save(this.todos);
  };

  updateTodo = (index, details, completed) => {
    this.todos[index - 1].details = details;
    this.todos[index - 1].completed = completed;
    Storage.save(this.todos);

    return this.todos[index - 1];
  };

  updateStatus = (index, status) => {
    BooleanTodo.updateStatus(this.getTodo(index), status);
    Storage.save(this.todos);
    return this.getTodo(index);
  };

  clearCompleted = () => {
    this.todos = this.todos.filter((t) => t.completed === false);
    this.todos.forEach((todo, index) => {
      todo.index = index + 1;
    });
    Storage.save(this.todos);
    return this.todos;
  };
}