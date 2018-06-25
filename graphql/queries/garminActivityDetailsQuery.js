import {GraphQLID, GraphQLList, GraphQLNonNull} from 'graphql';
import fetch from 'isomorphic-fetch';

import {GarminActivityDetailType} from '../types';

import {GARMIN_ACTIVITY_URL} from '../constants';

const garminActivityDetailsQuery = {
  type: new GraphQLList(GarminActivityDetailType),
  args: {
    garminActivityId: {
      description: 'The Garmin activity id.',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async(options, {garminActivityId}, context) => {
    const res = await fetch(
      `${GARMIN_ACTIVITY_URL}/${garminActivityId}/details?maxChartSize=1000`
    );
    const data = await res.json();

    // Normalize data structure.
    const details = [];
    data.activityDetailMetrics.forEach((point) => {
      const detail = {};
      point.metrics.forEach((metric, index) => {
        detail[data.metricDescriptors[index].key] = metric;
      });
      details.push(detail);
    });

    return details;
  },
};

export default garminActivityDetailsQuery;
