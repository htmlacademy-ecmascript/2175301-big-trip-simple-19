import SortView from '../view/sort-view.js';
import TripEditView from '../view/trip-edit-view.js';
import NewPointView from '../view/create-new-point-view.js';
import PointView from '../view/point-view.js';
import {render, RenderPosition} from '../render.js';
import PointListView from '../view/point-list-view.js';
import { isEscapeKey } from '../utils';

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
    };
    const replaceEditFormToPoint = () => {
      this.#pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (isEscapeKey) {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    editRollupBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointRollupBtn.addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    render(pointComponent, this.#pointListComponent.element);
  }

}

