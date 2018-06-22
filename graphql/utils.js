export const assertCanEdit = ({user}, userId) => {
  if (user && (user.id === userId || user.admin)) {
    return;
  }
  throw new Error('You do not have permission to update this user.');
};

export const getId = (id) => parseInt(id, 10);

export const getSumDistance = (activities=[]) => (
  +activities.reduce((total, a) => total + +a.distance, 0).toFixed(2)
);
