
export default class Section {
    constructor({ items, renderer }, container) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(container);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    rendererItem() {
        this._items.forEach(item => {
            this._renderer(item)
        });        
    }
}