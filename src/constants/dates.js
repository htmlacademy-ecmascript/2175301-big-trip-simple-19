import dayjs from 'dayjs';
import { getRandomInteger } from '../utils';

const TimeLevels = {
  DAYS: {
    MIN: 1,
    MAX: 3
  },
  HOURS: {
    MIN: 1,
    MAX: 23
  },
  MINUTES: {
    MIN: 1,
    MAX: 59
  }
};

const getRandomDate = () =>
  dayjs().add(getRandomInteger(TimeLevels.DAYS.MIN, TimeLevels.DAYS.MAX), 'day')
    .add(getRandomInteger(TimeLevels.HOURS.MIN, TimeLevels.HOURS.MAX), 'hour')
    .add(getRandomInteger(TimeLevels.MINUTES.MIN, TimeLevels.MINUTES.MAX), 'minute');

const getRandomDates = () => {
  const date1 = getRandomDate();
  const date2 = getRandomDate();
  if (date2.isAfter(date1)) {
    return {
      dateFrom: date1.toISOString(),
      dateTo: date2.toISOString()
    };
  }
  return {
    dateFrom: date2.toISOString(),
    dateTo: date1.toISOString()
  };
};

export { getRandomDates };
