import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {attributeFields} from 'graphql-sequelize';

import activitiesQuery from '../queries/activitiesQuery';
import shoesQuery from '../queries/shoesQuery';
import userActivitySummaryQuery from '../queries/userActivitySummaryQuery';

import {Activity, Brand, Shoe, User} from '../../models';

const ActivityCountField = {
  count: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'The total number of activities',
  },
};

const ActivitySumDistanceField = {
  sumDistance: {
    type: new GraphQLNonNull(GraphQLFloat),
    description: 'The total distance of the activities',
  },
};

export const ActivityType = new GraphQLObjectType({
  name: 'Activity',
  description: 'An activity',
  fields: () => ({
    ...attributeFields(Activity),
    shoe: {
      type: ShoeType,
      description: 'The shoe used in the activity.',
    },
    user: {
      type: UserType,
      description: 'The user who created the activity.',
    },
  }),
});

export const GarminActivityType = new GraphQLObjectType({
  name: 'GarminActivity',
  description: 'An activity from Garmin Connect',
  fields: () => {
    // Omit non-Garmin fields.
    const {
      id,
      friends,
      notes,
      shoe_id,
      shoeId,
      user_id,
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

export const GarminActivityDetailType = new GraphQLObjectType({
  name: 'GarminActivityDetail',
  description: 'A single activity detail point for a Garmin activity',
  fields: {
    sumElapsedDuration: {
      type: GraphQLInt,
    },
    sumMovingDuration: {
      type: GraphQLInt,
    },
    directLongitude: {
      type: GraphQLFloat,
    },
    sumDistance: {
      type: GraphQLFloat,
    },
    directTimestamp: {
      type: GraphQLString,
    },
    sumDuration: {
      type: GraphQLInt,
    },
    directCorrectedElevation: {
      type: GraphQLFloat,
    },
    directLatitude: {
      type: GraphQLFloat,
    },
    directHeartRate: {
      type: GraphQLInt,
    },
    directUncorrectedElevation: {
      type: GraphQLFloat,
    },
    directSpeed: {
      type: GraphQLFloat,
    },
    directElevation: {
      type: GraphQLFloat,
    },
    directVerticalSpeed: {
      type: GraphQLFloat,
    },
  },
});

export const ActivitySummaryType = new GraphQLObjectType({
  name: 'ActivitySummary',
  description: 'The summary of a user\'s activities for a given timeframe.',
  fields: () => ({
    ...ActivityCountField,
    ...ActivitySumDistanceField,
  }),
});

export const UserActivitySummaryType = new GraphQLObjectType({
  name: 'UserActivitySummary',
  description: 'The summary of a user\'s activities.',
  fields: () => ({
    week: {
      type: GraphQLNonNull(ActivitySummaryType),
      description: 'Activity count and total distance for the current week',
    },
    month: {
      type: GraphQLNonNull(ActivitySummaryType),
      description: 'Activity count and total distance for the current month',
    },
    year: {
      type: GraphQLNonNull(ActivitySummaryType),
      description: 'Activity count and total distance for the current year',
    },
  }),
});

export const ActivitiesType = new GraphQLObjectType({
  name: 'Activities',
  description: 'A set of activities',
  fields: {
    ...ActivityCountField,
    ...ActivitySumDistanceField,
    nodes: {
      type: new GraphQLList(ActivityType),
      description: 'The list of activities',
    },
  },
});

export const BrandType = new GraphQLObjectType({
  name: 'Brand',
  description: 'A brand',
  fields: attributeFields(Brand),
});

export const ShoeType = new GraphQLObjectType({
  name: 'Shoe',
  description: 'A shoe',
  fields: () => ({
    ...attributeFields(Shoe),
    activities: {
      type: ActivitiesType,
      description: 'The activities associated with the shoe.',
    },
    brand: {
      type: GraphQLString,
      description: 'The name of the brand associated with the shoe.',
    },
    name: {
      type: GraphQLString,
      description: 'The full name of the shoe (brand + model).',
    },
    user: {
      type: UserType,
      description: 'The user associated with the shoe.',
    },
  }),
});

export const ShoesType = new GraphQLObjectType({
  name: 'Shoes',
  description: 'A set of shoes',
  fields: {
    count: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The total number of shoes',
    },
    nodes: {
      type: new GraphQLList(ShoeType),
      description: 'The list of shoes',
    },
  },
});

export const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'The user fields that may be created or updated.',
  fields: () => {
    return {
      firstName: {
        description: 'The user\'s first name',
        type: GraphQLString,
      },
      lastName: {
        description: 'The user\'s last name',
        type: GraphQLString,
      },
      email: {
        description: 'The user\'s email address',
        type: GraphQLString,
      },
      distanceUnits: {
        description: 'The units of distance to use (miles or kilometers)',
        type: GraphQLInt,
      },
      location: {
        description: 'The user\'s location (city & state/province)',
        type: GraphQLString,
      },
      timezone: {
        description: 'The user\'s timezone',
        type: GraphQLString,
      },
    };
  },
});

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    ...attributeFields(User),
    activities: activitiesQuery,
    activitySummary: userActivitySummaryQuery(),
    shoes: shoesQuery(),
  }),
});
