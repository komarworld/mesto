export default class Section{
  constructor({renderer}, selector) {
      this._renderer = renderer;
      this._container = document.querySelector(selector);
  }

  renderItems(data){
      data.forEach((item) => {
          this._renderer(item);
      });
  }

  addItem(item){
      this._container.prepend(item);
  }
}