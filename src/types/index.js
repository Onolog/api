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
import {attributeFields, resolver} from 'graphql-sequelize';
import {pick} from 'lodash';

import {Activity, Brand, Shoe, User} from '../models';

import addShoeName from '../utils/addShoeName';
import getActivityObject from '../utils/getActivityObject';
import getGarminActivityDetails from '../utils/getGarminActivityDetails';
import summarizeActivities from '../utils/summarizeActivities';

const CountField = {
  count: {
    type: new GraphQLNonNull(GraphQLInt),
  },
};

const NodesField = (type) => ({
  nodes: {
    type: new GraphQLList(type),
  },
});

const SumDistanceField = {
  sumDistance: {
    type: new GraphQLNonNull(GraphQLFloat),
  },
};

export const ActivityType = new GraphQLObjectType({
  name: 'Activity',
  fields: () => ({
    ...attributeFields(Activity),
    details: {
      type: new GraphQLList(GarminActivityDetailType),
      resolve: (options, args, context) => (
        getGarminActivityDetails(options.garminActivityId)
      ),
    },
    shoe: {
      type: ShoeType,
      resolve: resolver(Activity.Shoe, {
        before: (options, args, context) => ({
          ...options,
          include: [{model: Brand}],
        }),
        after: addShoeName,
      }),
    },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: resolver(Activity.User),
    },
  }),
});

export const GarminActivityType = new GraphQLObjectType({
  name: 'GarminActivity',
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
  fields: () => ({
    ...CountField,
    ...SumDistanceField,
  }),
});

export const UserActivitySummaryType = new GraphQLObjectType({
  name: 'UserActivitySummary',
  fields: () => ({
    week: {
      type: new GraphQLNonNull(ActivitySummaryType),
      description: 'Activity count and total distance for the current week',
    },
    month: {
      type: new GraphQLNonNull(ActivitySummaryType),
      description: 'Activity count and total distance for the current month',
    },
    year: {
      type: new GraphQLNonNull(ActivitySummaryType),
      description: 'Activity count and total distance for the current year',
    },
  }),
});

export const ActivitiesType = new GraphQLObjectType({
  name: 'Activities',
  fields: {
    ...CountField,
    ...SumDistanceField,
    ...NodesField(ActivityType),
  },
});

export const BrandType = new GraphQLObjectType({
  name: 'Brand',
  fields: attributeFields(Brand),
});

export const ShoeInputType = new GraphQLInputObjectType({
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

export const ShoeType = new GraphQLObjectType({
  name: 'Shoe',
  fields: () => ({
    ...attributeFields(Shoe),
    activities: {
      type: ActivitiesType,
      resolve: resolver(Shoe.Activities, {
        after: getActivityObject,
      }),
    },
    brand: {
      type: new GraphQLNonNull(BrandType),
      resolve: resolver(Shoe.Brand),
    },
    name: {
      type: GraphQLString,
    },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: resolver(Shoe.User),
    },
  }),
});

export const ShoesType = new GraphQLObjectType({
  name: 'Shoes',
  fields: {
    ...CountField,
    ...NodesField(ShoeType),
  },
});

export const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: pick(attributeFields(User), [
    'firstName',
    'lastName',
    'email',
    'distanceUnits',
    'location',
    'timezone',
  ]),
});

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    ...attributeFields(User),
    activities: {
      type: new GraphQLNonNull(ActivitiesType),
      args: {
        limit: {
          description: 'The number of results to return',
          type: GraphQLInt,
        },
        range: {
          description: 'Date range to query',
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve: resolver(User.Activities, {
        after: getActivityObject,
      }),
    },
    // TODO: Should this just be a field on the ActivityType?
    activitySummary: {
      type: new GraphQLNonNull(UserActivitySummaryType),
      resolve: resolver(User.Activities, {
        list: true,
        // before: (options, args, context) => {},
        after: summarizeActivities,
      }),
    },
    shoes: {
      type: ShoesType,
      resolve: resolver(User.Shoes, {
        after: (results) => ({
          count: results.length,
          nodes: results,
        }),
      }),
    },
  }),
});
