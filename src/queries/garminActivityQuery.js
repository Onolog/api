import fetch from 'isomorphic-fetch';
import {GraphQLID, GraphQLNonNull} from 'graphql';

import {GarminActivityType} from '../types';
import {GARMIN_ACTIVITY_URL} from '../constants';
import garminUrlToActivity from '../utils/garminUrlToActivity';

const garminActivityQuery = {
  type: new GraphQLNonNull(GarminActivityType),
  args: {
    garminActivityId: {
      description: 'The Garmin activity id.',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async(options, {garminActivityId}, context) => {
    try {
      const res = await fetch(`${GARMIN_ACTIVITY_URL}/${garminActivityId}`);
      const data = await res.json();
      return garminUrlToActivity(data);
    } catch (err) {
      throw Error(err);
    }

  },
};

export default garminActivityQuery;
