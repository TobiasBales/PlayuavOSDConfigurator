const distanceMultiplyer = [1.0, 2.23];
const distanceDivider = [1000, 5280];
const unitsShort = ['M', 'F'];
const unitsLong = ['KM', 'M'];

function convertDistance(distance, units) {
  const convert = distanceMultiplyer[units];
  const divider = distanceDivider[units];
  const short = unitsShort[units];
  const long = unitsLong[units];

  let content = '';

  if (distance < convert) {
    content = `${distance.toFixed(0)}${short}`;
  } else {
    content = `${(distance / divider).toFixed(2)}${long}`;
  }

  return content;
}

export default { convertDistance };
