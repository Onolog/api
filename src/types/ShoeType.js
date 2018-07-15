import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {attributeFields, resolver} from 'graphql-sequelize';

import ActivitiesType from './ActivitiesType';
import BrandType from './BrandType';
import UserType from './UserType';

import {Shoe} from '../models';
import resolveActivities from '../utils/resolveActivities';

export default new GraphQLObjectType({
  name: 'Shoe',
  fields: () => ({
    ...attributeFields(Shoe),
    activities: {
      type: ActivitiesType,
      resolve: resolveActivities(Shoe.Activities),
    },
    brand: {
      type: new GraphQLNonNull(BrandType),
      resolve: resolver(Shoe.Brand),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: resolver(Shoe.User),
    },
  }),
});
