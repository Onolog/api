const METERS_PER_MILE = 1609.35;
const FEET_PER_METER = 3.28084;

export const assertCanEdit = ({user}, userId) => {
  if (user && (getId(user.id) === getId(userId) || user.admin)) {
    return;
  }
  throw new Error('You do not have permission to update this user.');
};

export const getId = (id) => parseInt(id, 10);

export const getSumDistance = (activities=[]) => (
  +activities.reduce((total, a) => total + +a.distance, 0).toFixed(2)
);

export const metersToMiles = (distanceInMeters, precision=2) => {
  const miles = distanceInMeters / METERS_PER_MILE;

  // Round to x decimal places.
  // See:
  //  - https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript
  //  - https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding/32605063#32605063
  return +(Math.round(+(miles + 'e' + precision)) + 'e' + -precision);
};

export const metersToFeet = (distanceInMeters) => (
  +(Math.round(distanceInMeters * FEET_PER_METER))
);
