import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';

import { GarminActivityDetailType } from '../types';
import getGarminActivityDetails from '../utils/getGarminActivityDetails';

const garminActivityDetailsQuery = {
  type: new GraphQLList(GarminActivityDetailType),
  args: {
    garminActivityId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (options, args, context) => (
    getGarminActivityDetails(args.garminActivityId)
  ),
};

export default garminActivityDetailsQuery;
