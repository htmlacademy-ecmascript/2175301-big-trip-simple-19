
import FilterView from './view/filters-view.js';
import TripPresenter from './presenter/presenter.js';
import {render} from './render.js';
import PointModel from './model/point-model.js';

const siteMainElement = document.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-controls__filters');
const pointsModel = new PointModel();

const tripPresenter = new TripPresenter({pointContainer: siteMainElement, pointsModel});

render(new FilterView(), siteHeaderElement);

tripPresenter.init();
