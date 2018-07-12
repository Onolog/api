import {GraphQLID, GraphQLNonNull} from 'graphql';
import fetch from 'isomorphic-fetch';
import moment from 'moment-timezone';

import {GarminActivityType} from '../types';
import {FEET_PER_METER, GARMIN_ACTIVITY_URL, METERS_PER_MILE} from '../constants';

const metersToMiles = (distanceInMeters, precision=2) => {
  const miles = distanceInMeters / METERS_PER_MILE;

  // Round to x decimal places.
  // See:
  //  - https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript
  //  - https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding/32605063#32605063
  return +(Math.round(+(miles + 'e' + precision)) + 'e' + -precision);
};

const metersToFeet = (distanceInMeters) => (
  +(Math.round(distanceInMeters * FEET_PER_METER))
);

// Normalizes activity data pulled from Garmin's endpoints.
function garminUrlToActivity(activity) {
  const {
    averageHR,
    calories,
    distance,
    duration,
    elevationGain,
    elevationLoss,
    maxHR,
    startTimeLocal,
  } = activity.summaryDTO;

  const timezone = activity.timeZoneUnitDTO.timeZone;

  return {
    activityType: activity.activityTypeDTO.typeKey,
    avgHr: averageHR,
    calories: calories && Math.round(calories),
    distance: metersToMiles(distance),
    duration: Math.round(duration),
    elevationGain: metersToFeet(elevationGain),
    elevationLoss: metersToFeet(elevationLoss),
    garminActivityId: activity.activityId,
    maxHr: maxHR,
    startDate: moment.tz(startTimeLocal, timezone).format(),
    timezone,
  };
}

const garminActivityQuery = {
  type: new GraphQLNonNull(GarminActivityType),
  args: {
    garminActivityId: {
      description: 'The Garmin activity id.',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async(options, {garminActivityId}, context) => {
    const res = await fetch(`${GARMIN_ACTIVITY_URL}/${garminActivityId}`);
    const data = await res.json();

    return garminUrlToActivity(data);
  },
};

export default garminActivityQuery;
