import getId from '../getId';

describe('getId', () => {
  test('correctly parses an id', () => {
    expect(getId(1234)).toBe(1234);
    expect(getId('1234')).toBe(1234);
    expect(getId(null)).toBe(NaN);
  });
});
