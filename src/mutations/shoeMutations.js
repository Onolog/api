import {GraphQLID, GraphQLNonNull} from 'graphql';

import {Brand, Shoe} from '../models';
import {ShoeInputType, ShoeType} from '../types';
import {createRecord, deleteRecord, updateRecord} from '../utils/mutationUtils';

export const createShoe = {
  type: ShoeType,
  args: {
    input: {
      type: new GraphQLNonNull(ShoeInputType),
    },
  },
  resolve: createRecord(Shoe, {
    include: [{model: Brand}],
  }),
};

export const deleteShoe = {
  type: new GraphQLNonNull(GraphQLID),
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
  resolve: updateRecord(Shoe, {
    include: [{model: Brand}],
  }),
};
