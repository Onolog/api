import {GARMIN_ACTIVITY_URL} from '../constants';

const normalizeData = (data) => {
  // Normalize data structure.
  const details = [];
  data.activityDetailMetrics.forEach((point) => {
    const detail = {};
    point.metrics.forEach((metric, index) => {
      detail[data.metricDescriptors[index].key] = metric;
    });
    details.push(detail);
  });
  return details;
};

export default async(garminActivityId, params = {}) => {
  try {
    const url = `${GARMIN_ACTIVITY_URL}/${garminActivityId}/details`;
    const res = await fetch(`${url}?maxChartSize=1000`);
    const data = await res.json();
    return normalizeData(data);
  } catch (err) {
    throw Error(err);
  }
};
