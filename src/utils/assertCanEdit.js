import getId from './getId';

export default (context, userId) => {
  const {user} = context;
  if (user && (getId(user.id) === getId(userId) || user.admin)) {
    return;
  }
  throw new Error('You do not have permission to update this item.');
};
