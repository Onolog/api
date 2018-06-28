module.exports = (sequelize, DataTypes) => {
  const ActivityFriend = sequelize.define('ActivityFriend', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    activityId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'activity_id',
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'user_id',
    },
  }, {
    tableName: 'activities_friends',
  });

  return ActivityFriend;
};
