import {GraphQLBoolean, GraphQLID, GraphQLNonNull} from 'graphql';

import {Shoe} from '../models';
import {ShoeInputType, ShoeType} from '../types';
import {createRecord, deleteRecord, updateRecord} from '../utils/mutationUtils';

export const createShoe = {
  type: ShoeType,
  args: {
    input: {
      type: new GraphQLNonNull(ShoeInputType),
    },
  },
  resolve: createRecord(Shoe),
};

export const deleteShoe = {
  type: new GraphQLNonNull(GraphQLBoolean),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: deleteRecord(Shoe),
};

export const updateShoe = {
  type: ShoeType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    input: {
      type: new GraphQLNonNull(ShoeInputType),
    },
  },
  resolve: updateRecord(Shoe),
};
