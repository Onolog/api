module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      primaryKey: true,
      field: 'id',
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
    password: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: '',
      field: 'password',
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created',
    },
    createdAt: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.created;
      },
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login',
    },
    updatedAt: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.lastLogin;
      },
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
    createdAt: 'created',
    updatedAt: 'last_login',
  });

  User.associate = ({Activity, Shoe, User}) => {
    User.hasMany(Activity);
    User.hasMany(Shoe);
  };

  return User;
};
