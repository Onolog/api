const getSumDistance = (results=[]) => (
  +results.reduce((total, result) => total + +result.distance, 0).toFixed(2)
);

export default (results) => ({
  count: results.length,
  nodes: results,
  sumDistance: getSumDistance(results),
});
