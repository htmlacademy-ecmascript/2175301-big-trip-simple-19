import { getRandomPoint } from '../constants/point.js';

const POINTS = 5;

export default class PointModel {
  #point = Array.from({length: POINTS}, getRandomPoint);

  get points(){
    return this.#point;
  }
}

