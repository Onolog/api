module.exports = (sequelize, DataTypes) => {
  const Split = sequelize.define('Split', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    activityId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      field: 'activity_id',
    },
    split: {
      type: DataTypes.INTEGER(4).UNSIGNED,
      allowNull: true,
      field: 'split',
    },
    distance: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'distance',
    },
    duration: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: true,
      field: 'duration',
    },
    avgHr: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true,
      field: 'avg_hr',
    },
    maxHr: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true,
      field: 'max_hr',
    },
    calories: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: true,
      field: 'calories',
    },
    elevationChange: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'elevation_change',
    },
    elevationGain: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'elevation_gain',
    },
    elevationLoss: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'elevation_loss',
    },
    maxSpeed: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'max_speed',
    },
  }, {
    tableName: 'splits',
  });

  return Split;
};
