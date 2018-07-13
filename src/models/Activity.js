module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    userId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'user_id',
    },
    activityType: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'activity_type',
    },
    startDate: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: '0',
      field: 'start_date',
    },
    timezone: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'timezone',
    },
    distance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.00',
      field: 'distance',
    },
    duration: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: true,
      defaultValue: '0',
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
      type: DataTypes.INTEGER(5),
      allowNull: true,
      field: 'calories',
    },
    shoeId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      field: 'shoe_id',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'notes',
    },
    friends: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'friends',
    },
    garminActivityId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'garmin_activity_id',
    },
    elevationGain: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: true,
      field: 'elevation_gain',
    },
    elevationLoss: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: true,
      field: 'elevation_loss',
    },
  }, {
    tableName: 'activities',
  });

  Activity.associate = ({Activity, Shoe, Split, User}) => {
    Activity.User = Activity.belongsTo(User, {foreignKey: 'user_id'});
    Activity.Shoe = Activity.belongsTo(Shoe, {foreignKey: 'shoe_id'});
    Activity.Splits = Activity.hasMany(Split, {foreignKey: 'activity_id'});
  };

  return Activity;
};
