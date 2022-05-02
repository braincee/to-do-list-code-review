export default class BooleanTodo {
    static updateStatus = (task, status) => {
      task.completed = status;
    };
}