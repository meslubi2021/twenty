import { logError } from './logError';

const DEBUG_MODE = false;

export const canBeCastAsIntegerOrNull = (
  probableNumberOrNull: string | undefined | number | null,
): probableNumberOrNull is number | null => {
  if (probableNumberOrNull === undefined) {
    if (DEBUG_MODE) logError('probableNumberOrNull === undefined');

    return false;
  }

  if (typeof probableNumberOrNull === 'number') {
    if (DEBUG_MODE) logError('typeof probableNumberOrNull === "number"');

    return Number.isInteger(probableNumberOrNull);
  }

  if (probableNumberOrNull === null) {
    if (DEBUG_MODE) logError('probableNumberOrNull === null');

    return true;
  }

  if (probableNumberOrNull === '') {
    if (DEBUG_MODE) logError('probableNumberOrNull === ""');

    return true;
  }

  if (typeof probableNumberOrNull === 'string') {
    const stringAsNumber = +probableNumberOrNull;

    if (isNaN(stringAsNumber)) {
      if (DEBUG_MODE) logError('isNaN(stringAsNumber)');

      return false;
    }
    if (Number.isInteger(stringAsNumber)) {
      if (DEBUG_MODE) logError('Number.isInteger(stringAsNumber)');

      return true;
    }
  }

  return false;
};

export const castAsIntegerOrNull = (
  probableNumberOrNull: string | undefined | number | null,
): number | null => {
  if (canBeCastAsIntegerOrNull(probableNumberOrNull) === false) {
    throw new Error('Cannot cast to number or null');
  }

  if (probableNumberOrNull === null) {
    return null;
  }

  if (probableNumberOrNull === '') {
    return null;
  }

  if (typeof probableNumberOrNull === 'number') {
    return probableNumberOrNull;
  }

  if (typeof probableNumberOrNull === 'string') {
    return +probableNumberOrNull;
  }

  return null;
};
