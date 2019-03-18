import assertCanEdit from './assertCanEdit';

export const createRecord = (Model, options) => async (root, args, context) => {
  try {
    const instance = await Model.create(args.input);
    return Model.findById(instance.id, options);
  } catch (err) {
    throw Error(err);
  }
};

export const updateRecord = (Model, options) => async (root, args, context) => {
  try {
    const instance = await Model.findById(args.id);
    assertCanEdit(context, instance.userId);
    await instance.update(args.input);

    // Re-fetch the record to make sure we have the right associations.
    // TODO: How to make this more efficient?
    return await Model.findById(args.id, options);
  } catch (err) {
    throw Error(err);
  }
};

export const deleteRecord = (Model, options) => (
  async (root, { id }, context) => {
    try {
      const instance = await Model.findById(id);
      assertCanEdit(context, instance.userId);
      await instance.destroy();
      return id;
    } catch (err) {
      throw Error(err);
    }
  }
);
