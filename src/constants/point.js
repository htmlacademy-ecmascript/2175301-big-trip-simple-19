import { getRandomInteger, getRandomArrayElement } from '../utils';
import { POINTS_TYPES } from './mock.js';
import { getRandomDates } from './dates.js';
import { getDestination } from './destinations.js';
import { getOfferByType } from './offers.js';

const MIN_ARRAY_LENGTH = 0;
const MIN_DESTINATION_COUNT = 2;
const MAX_DESTINATION_COUNT = 6;
const OFFERS_BY_TYPE_COUNT = 8;
const MIN_BASE_PRICE = 100;
const MAX_BASE_PRICE = 1000;

const offersByType = Array.from({ length: OFFERS_BY_TYPE_COUNT }, getOfferByType);
const destinations = Array.from({ length: getRandomInteger(MIN_DESTINATION_COUNT, MAX_DESTINATION_COUNT) }, (_value, index) => getDestination(index));
const getRandomOffersIds = () => {
  const randomOffers = getRandomArrayElement(offersByType).offers;
  const index = [];
  const lengthOfArray = getRandomInteger(MIN_ARRAY_LENGTH, randomOffers.length);
  for (index.length = 0; index.length <= lengthOfArray; index.length ++) {
    const currentElement = getRandomInteger(MIN_ARRAY_LENGTH, randomOffers.length);
    if (!index.includes(currentElement)) {
      index.push(currentElement);
    }
  }
  return index;
};
const getRandomPoint = (count) => {
  const randomDates = getRandomDates();
  return {
    basePrice: getRandomInteger(MIN_BASE_PRICE, MAX_BASE_PRICE),
    dateFrom: randomDates.dateFrom,
    dateTo: randomDates.dateTo,
    destination: getRandomArrayElement(destinations).id,
    id: count,
    isFavorite: false,
    offers: getRandomOffersIds(),
    type: getRandomArrayElement(POINTS_TYPES)
  };
};
export {getRandomPoint, offersByType, destinations};
