import {GraphQLInputObjectType} from 'graphql';
import {attributeFields} from 'graphql-sequelize';
import {pick} from 'lodash';

import {Activity} from '../models';

export default new GraphQLInputObjectType({
  name: 'ActivityInput',
  fields: pick(attributeFields(Activity), [
    'activityType',
    'distance',
    'duration',
    'avgHr',
    'maxHr',
    'calories',
    'elevationGain',
    'elevationLoss',
    'friends',
    'garminActivityId',
    'notes',
    'shoeId',
    'startDate',
    'timezone',
    'userId',
  ]),
});
