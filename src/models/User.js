module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      primaryKey: true,
      field: 'id',
    },
    userId: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.id;
      },
    },
    firstName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '',
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: '',
      field: 'last_name',
    },
    name: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      defaultValue: '',
      unique: true,
      field: 'email',
    },
    createdAt: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'updated_at',
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created',
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login',
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'location',
    },
    timezone: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'timezone',
    },
    distanceUnits: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
      field: 'distance_units',
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });

  User.associate = ({Activity, Shoe, User}) => {
    User.Activities = User.hasMany(Activity);
    User.Shoes = User.hasMany(Shoe);
  };

  return User;
};
