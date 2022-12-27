import {createElement} from '../render.js';

function createFormEditTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class LoadingView {
  #element = null;

  get template() {
    return createFormEditTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
