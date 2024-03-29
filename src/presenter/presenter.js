import SortView from '../view/sort-view.js';
import TripEditView from '../view/trip-edit-view.js';
import NewPointView from '../view/create-new-point-view.js';
import PointView from '../view/point-view.js';
import {render, RenderPosition} from '../render.js';
import PointListView from '../view/point-list-view.js';
import { isEscapeKey } from '../utils';
import EmptyView from '../view/empty-view.js';

export default class TripPresenter {
  #pointListComponent = new PointListView();

  #pointContainer = null;
  #pointsModel = null;
  #listPoints = [];

  constructor({pointContainer, pointsModel}) {
    this.#pointContainer = pointContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points];

    this.#renderPointsList();
  }

  #renderPointsList() {
    if (!this.#listPoints.length) {
      render(new EmptyView(), this.#pointContainer);
      return;
    }

    render(new SortView(), this.#pointContainer);
    render(this.#pointListComponent, this.#pointContainer);
    render(new NewPointView(), this.#pointListComponent.element, RenderPosition.AFTERBEGIN);

    this.#listPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointComponent = new PointView({point});
    const pointEditComponent = new TripEditView({point});

    const pointRollupBtn = pointComponent.element.querySelector('.event__rollup-btn');
    const editPointForm = pointEditComponent.element.querySelector('form');
    const editRollupBtn = editPointForm.querySelector('.event__rollup-btn');

    const replacePointToEditForm = () => {
      this.#pointListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
      editRollupBtn.addEventListener('click', onCloseEditPointForm);
      editPointForm.addEventListener('submit', onCloseEditPointForm);
      document.addEventListener('keydown', onEscKeyDown);
    };
    const replaceEditFormToPoint = () => {
      this.#pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
      editRollupBtn.removeEventListener('click', onCloseEditPointForm);
      editPointForm.removeEventListener('submit', onCloseEditPointForm);
      document.removeEventListener('keydown', onEscKeyDown);
    };

    function onEscKeyDown (evt) {
      if (isEscapeKey) {
        onCloseEditPointForm(evt);
      }
    }

    function onCloseEditPointForm (evt) {
      evt.preventDefault();
      replaceEditFormToPoint();
    }

    pointRollupBtn.addEventListener('click', () => {
      replacePointToEditForm();
    });

    render(pointComponent, this.#pointListComponent.element);
  }

}

