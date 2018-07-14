import {GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} from 'graphql';
import {resolver} from 'graphql-sequelize';
import {Op} from 'sequelize';

import {Activity} from '../models';
import {ActivitiesType, OrderType} from '../types';

import getActivityObject from '../utils/getActivityObject';
import prepareActivityQuery from '../utils/prepareActivityQuery';

const activitiesQuery = {
  type: new GraphQLNonNull(ActivitiesType),
  args: {
    id: {
      description: 'ID of an activity',
      type: GraphQLID,
    },
    limit: {
      description: 'The number of results to return',
      type: GraphQLInt,
    },
    order: {
      type: GraphQLString,
    },
    range: {
      description: 'Date range to query',
      type: new GraphQLList(GraphQLString),
    },
    shoeId: {
      description: 'ID of shoe',
      type: GraphQLID,
    },
    userId: {
      description: 'ID of user',
      type: GraphQLID,
    },
  },
  resolve: resolver(Activity, {
    list: true,
    before: prepareActivityQuery,
    after: getActivityObject,
  }),
};

export default activitiesQuery;
