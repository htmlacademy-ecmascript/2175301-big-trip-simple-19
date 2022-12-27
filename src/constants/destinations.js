import { getRandomInteger, getRandomArrayElement } from '../utils';
import { DESCRIPTIONS, CITIES_NAMES } from './mock.js';

const MIN_COUNT_DESCRIPTIONS = 1;
const MAX_COUNT_DESCRIPTIONS = 5;
const MIN_RANDOM_PIC = 1;
const MAX_RANDOM_PIC = 50;
const MIN_PIC_COUNT = 2;
const MAX_PIC_COUNT = 6;

const getRandomDestinationDescription = () => {
  const count = getRandomInteger(MIN_COUNT_DESCRIPTIONS, MAX_COUNT_DESCRIPTIONS, );
  const descriptionsArr = [];
  for (let i = 0; i <= count; i++) {
    descriptionsArr.push(
      getRandomArrayElement(DESCRIPTIONS));
  }
  return descriptionsArr;
};
const getPicture = () => ({
  src: `https://loremflickr.com/248/152?random=${getRandomInteger(MIN_RANDOM_PIC, MAX_RANDOM_PIC)}`,
  description: getRandomArrayElement(DESCRIPTIONS)
});
const getDestination = (index) =>({
  id: ++index,
  description: getRandomDestinationDescription(),
  name: getRandomArrayElement(CITIES_NAMES),
  pictures: Array.from({ length: getRandomInteger(MIN_PIC_COUNT, MAX_PIC_COUNT) }, getPicture)
});
export {getRandomDestinationDescription, getDestination};
