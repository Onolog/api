import {resolver} from 'graphql-sequelize';
import {Op} from 'sequelize';

const getSumDistance = (results = []) => (
  +results.reduce((total, result) => total + +result.distance, 0).toFixed(2)
);

export default (model, options = {}) => resolver(model, {
  ...options,
  before: (options, args, context) => {
    // Order from newest to oldest by default.
    const order = options.order || [['startDate', 'DESC']];
    const where = options.where || {};

    if (args.range) {
      where.startDate = {[Op.between]: args.range};
    }

    if (args.filter) {
      where.notes = {[Op.like]: `%${args.filter}%`};
    }

    return {...options, order, where};
  },
  after: (results) => ({
    count: results.length,
    nodes: results,
    sumDistance: getSumDistance(results),
  }),
});
