export default class Storage {
    static save = (todo) => {
      localStorage.setItem('myList', JSON.stringify(todo));
    };

    static load = () => (localStorage.getItem('myList') != null
      ? JSON.parse(localStorage.getItem('myList'))
      : []);
}