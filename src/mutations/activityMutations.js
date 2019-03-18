import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Activity } from '../models';
import { ActivityInputType, ActivityType } from '../types';
import { createRecord, deleteRecord, updateRecord } from '../utils/mutationUtils';

export const createActivity = {
  type: ActivityType,
  args: {
    input: {
      type: new GraphQLNonNull(ActivityInputType),
    },
  },
  resolve: createRecord(Activity),
};

export const deleteActivity = {
  type: new GraphQLNonNull(GraphQLID),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: deleteRecord(Activity),
};

export const updateActivity = {
  type: ActivityType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    input: {
      type: new GraphQLNonNull(ActivityInputType),
    },
  },
  resolve: updateRecord(Activity),
};
