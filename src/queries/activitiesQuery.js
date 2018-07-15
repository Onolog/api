import {GraphQLID, GraphQLNonNull} from 'graphql';

import {Activity} from '../models';
import {ActivitiesType} from '../types';
import {LimitField, OrderField, RangeField} from '../types/fields';

import resolveActivities from '../utils/resolveActivities';

const activitiesQuery = {
  type: new GraphQLNonNull(ActivitiesType),
  args: {
    id: {
      description: 'ID of an activity',
      type: GraphQLID,
    },
    shoeId: {
      description: 'ID of shoe',
      type: GraphQLID,
    },
    userId: {
      description: 'ID of user',
      type: GraphQLID,
    },
    ...LimitField,
    ...OrderField,
    ...RangeField,
  },
  resolve: resolveActivities(Activity, {
    list: true,
  }),
};

export default activitiesQuery;
