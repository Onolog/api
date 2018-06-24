import {GraphQLID, GraphQLNonNull} from 'graphql';
import fetch from 'isomorphic-fetch';
import moment from 'moment-timezone';

import {GarminActivityType} from '../types';
import {metersToFeet, metersToMiles} from '../utils';

const URL = 'https://connect.garmin.com/proxy/activity-service/activity/';

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

  return {
    activityType: activity.activityTypeDTO.typeKey,
    avgHr: averageHR,
    // TODO: Accept decimal values?
    calories: calories && Math.round(calories),
    distance: metersToMiles(distance),
    // TODO: Accept decimal values?
    duration: Math.round(duration),
    elevationGain: metersToFeet(elevationGain),
    elevationLoss: metersToFeet(elevationLoss),
    garminActivityId: activity.activityId,
    maxHr: maxHR,
    startDate: moment(startTimeLocal).format(),
    timezone: activity.timeZoneUnitDTO.timeZone,

    // TODO: Add these models to the schema.
    // device: {},
    // laps: splits.lapDTOs,
    // tracks: [],
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
  resolve: async (options, {garminActivityId}, context) => {
    const res = await fetch(`${URL}${garminActivityId}`);
    const data = await res.json();

    return garminUrlToActivity(data);
  },
};

export default garminActivityQuery;
