import assertCanEdit from '../assertCanEdit';

const id = 0;

const user = {
  id,
  admin: false,
};

const adminUser = {
  id: 1,
  admin: true,
};

describe('assertCanEdit', () => {
  test('checks whether a user has editing privileges', () => {
    expect(() => assertCanEdit({ user }, id)).not.toThrow();
    expect(() => assertCanEdit({ user }, '0')).not.toThrow();
    expect(() => assertCanEdit({ user: adminUser }, id)).not.toThrow();
  });

  test('throws an error when the user cannot edit', () => {
    expect(() => assertCanEdit({}, id)).toThrow();
    expect(() => assertCanEdit({ user }, 1)).toThrow();
  });
});
