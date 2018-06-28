import assertCanEdit from './assertCanEdit';

export const createRecord = (Model) => async(root, args, context) => {
  try {
    return await Model.create(args.input);
  } catch (err) {
    throw Error(err);
  }
};

export const updateRecord = (Model) => async(root, args, context) => {
  try {
    const instance = await Model.findById(args.id);
    assertCanEdit(context, instance.userId);
    return await instance.update(args.input);
  } catch (err) {
    throw Error(err);
  }
};

export const deleteRecord = (Model) => async(root, args, context) => {
  try {
    const instance = await Model.findById(args.id);
    assertCanEdit(context, instance.userId);
    return await instance.destroy();
  } catch (err) {
    throw Error(err);
  }
};
