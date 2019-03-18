import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';

import { Activity } from '../models';

export default new GraphQLObjectType({
  name: 'GarminActivity',
  fields: () => {
    // Omit non-Garmin fields.
    const {
      id,
      friends,
      notes,
      shoe_id, /* eslint-disable-line camelcase */
      shoeId,
      user_id, /* eslint-disable-line camelcase */
      userId,
      ...activityFields
    } = attributeFields(Activity);

    return {
      ...activityFields,
      garminActivityId: {
        type: new GraphQLNonNull(GraphQLID),
      },
    };
  },
});
