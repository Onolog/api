import { GraphQLInputObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { pick } from 'lodash';

import { Shoe } from '../models';

export default new GraphQLInputObjectType({
  name: 'ShoeInput',
  fields: pick(attributeFields(Shoe), [
    'brandId',
    'inactive',
    'model',
    'notes',
    'size',
    'sizeType',
    'userId',
  ]),
});
