module.exports = (sequelize, DataTypes) => {
  const Trackpoint = sequelize.define('Trackpoint', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    activityId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      field: 'activity_id',
    },
    time: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: 'time',
    },
    latitudeDeg: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'latitude_deg',
    },
    longitudeDeg: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'longitude_deg',
    },
    altitudeMeters: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'altitude_meters',
    },
    distanceMeters: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'distance_meters',
    },
    heartRateBpm: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true,
      field: 'heart_rate_bpm',
    },
    speed: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'speed',
    },
  }, {
    tableName: 'trackpoints',
  });

  return Trackpoint;
};
