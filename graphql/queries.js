import {GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString} from 'graphql';
import {resolver} from 'graphql-sequelize';

import {ActivityType, ActivitiesType, BrandType, ShoeType, ShoesType, UserType} from './types';

function getId(id) {
  return parseInt(id, 10);
}

function sum(total, result) {
  return total + +result.distance;
}

export const activityQuery = ({Activity}) => ({
  type: ActivityType,
  args: {
    id: {
      description: 'ID of activity',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: resolver(Activity, {
    after: (result) => (result.length ? result[0] : result),
  }),
});

export const activitiesQuery = ({Activity, Sequelize}) => ({
  type: new GraphQLNonNull(ActivitiesType),
  args: {
    limit: {
      description: 'The number of results to return',
      type: GraphQLInt,
    },
    range: {
      description: '',
      type: new GraphQLList(GraphQLString),
    },
    shoeId: {
      description: 'ID of shoe',
      type: GraphQLID,
    },
    userId: {
      description: 'ID of user',
      type: GraphQLID,
    },
  },
  resolve: resolver(Activity, {
    list: true,
    before: (options, args, context) => {
      const shoeId = getId(args.shoeId);
      const userId = getId(args.userId);

      let where = {};

      if (args.range) {
        where.startDate = {[Sequelize.Op.between]: args.range};
      }

      if (shoeId) {
        where.shoeId = shoeId;
      }

      if (userId) {
        where.userId = userId;
      }

      return {
        ...options,
        // Order from newest to oldest.
        order: [['startDate', 'DESC']],
        where,
      };
    },
    after: (result) => {
      return {
        count: result.length,
        nodes: result,
        sumDistance: +result.reduce(sum, 0).toFixed(2),
      };
    },
  }),
});

export const brandQuery = ({Brand}) => ({
  type: BrandType,
  args: {
    id: {
      description: 'ID of the brand',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: resolver(Brand, {
    after: (result) => (result.length ? result[0] : result),
  }),
});

export const brandsQuery = ({Brand}) => ({
  type: new GraphQLList(BrandType),
  resolve: resolver(Brand),
});

export const shoeQuery = ({Shoe}) => ({
  type: ShoeType,
  args: {
    id: {
      description: 'ID of a shoe',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: resolver(Shoe, {
    after: (result) => (result.length ? result[0] : result),
  }),
});

export const shoesQuery = ({Shoe}) => ({
  type: new GraphQLNonNull(ShoesType),
  args: {
    limit: {
      description: 'The number of results to return',
      type: GraphQLInt,
    },
    userId: {
      description: 'ID of user',
      type: GraphQLID,
    },
  },
  resolve: resolver(Shoe, {
    list: true,
    before: (options, args, context) => {
      const userId = getId(args.userId);

      let where = {};
      if (userId) {
        where.userId = userId;
      }

      return {...options, where};
    },
    after: (result) => ({
      count: result.length,
      nodes: result,
    }),
  }),

});

export const userQuery = ({User}) => ({
  type: UserType,
  args: {
    id: {
      description: 'ID of user',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: resolver(User, {
    after: (result) => (result.length ? result[0] : result),
  }),
});

export const usersQuery = ({User}) => ({
  type: new GraphQLList(UserType),
  resolve: resolver(User),
});

export default (models) => ({
  activity: activityQuery(models),
  activities: activitiesQuery(models),
  brand: brandQuery(models),
  brands: brandsQuery(models),
  shoe: shoeQuery(models),
  shoes: shoesQuery(models),
  user: userQuery(models),
  users: usersQuery(models),
});
