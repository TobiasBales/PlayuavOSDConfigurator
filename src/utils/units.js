const speedMultiplier = [3.6, 2.23];
const speedUnitsLong = ['KM/H', 'Mi/H'];
const distanceMultiplyer = [1.0, 3.28];
const distanceDivider = [1000, 5280];
const unitsShort = ['M', 'F'];
const unitsLong = ['KM', 'Mi'];

function longDistanceUnits(units) {
  return unitsLong[units];
}

function shortDistanceUnits(units) {
  return unitsShort[units];
}

function speedUnits(units) {
  return speedUnitsLong[units];
}

function convertSpeed(speed, units) {
  const unitsString = speedUnitsLong[units];
  const convertedSpeed = convertSpeedWithoutUnits(speed, units);

  return `${convertedSpeed}${unitsString}`;
}

function convertSpeedWithoutUnits(speed, units) {
  const convert = speedMultiplier[units];
  return speed * convert;
}

function convertDistance(distance, units) {
  const convertedDistance = convertDistanceWithoutUnits(distance, units);
  const divider = distanceDivider[units];
  let unitsString = '';
  let distanceString = '';

  if (distance < divider) {
    unitsString = unitsShort[units];
    distanceString = convertedDistance.toFixed(0);
  } else {
    unitsString = unitsLong[units];
    distanceString = convertedDistance.toFixed(2);
  }

  return `${distanceString}${unitsString}`;
}

function convertDistanceWithoutUnits(distance, units) {
  const multiplier = distanceMultiplyer[units];
  const divider = distanceDivider[units];

  const correctedDistance = distance * multiplier;

  if (correctedDistance >= divider) {
    return correctedDistance / divider;
  }
  return correctedDistance;
}

export default {
  convertDistance,
  convertSpeed,
  convertDistanceWithoutUnits,
  convertSpeedWithoutUnits,
  longDistanceUnits,
  shortDistanceUnits,
  speedUnits
};
