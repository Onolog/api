module.exports = (sequelize, DataTypes) => {
  const Shoe = sequelize.define('Shoe', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    model: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: '',
      field: 'model',
    },
    brandId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: 'brand_id',
    },
    userId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'user_id',
    },
    inactive: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      field: 'inactive',
    },
    sizeType: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      field: 'size_type',
    },
    size: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'size',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'notes',
    },
  }, {
    tableName: 'shoes',
  });

  Shoe.associate = ({Activity, Shoe, User}) => {
    Shoe.belongsTo(User);
    Shoe.hasMany(Activity);
  };

  return Shoe;
};
