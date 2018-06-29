import {GraphQLObjectType} from 'graphql';
import {attributeFields} from 'graphql-sequelize';

import {Brand} from '../models';

export default new GraphQLObjectType({
  name: 'Brand',
  fields: attributeFields(Brand),
});
