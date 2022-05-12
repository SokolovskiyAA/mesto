
export default class Section {
    constructor({ renderer }, container) {
        this._renderer = renderer;
        this._container = document.querySelector(container);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItem(items) {

        items.forEach(item => {
            this._renderer(item)
        });        
    }
}