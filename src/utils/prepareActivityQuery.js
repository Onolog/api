export default (options, args, context) => {
  // Order from newest to oldest by default.
  const order = options.order || [['startDate', 'DESC']];
  const where = options.where || {};

  if (args.range) {
    where.startDate = {[Op.between]: args.range};
  }

  return {...options, order, where};
};
