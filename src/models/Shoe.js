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
      field: 'user_id',
    },
    name: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.get('Brand').name} ${this.model}`;
      },
    },
    inactive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'inactive',
    },
    sizeType: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: 0,
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

  Shoe.associate = ({Activity, Brand, Shoe, User}) => {
    Shoe.Brand = Shoe.belongsTo(Brand, {foreignKey: 'brand_id'});
    Shoe.User = Shoe.belongsTo(User, {foreignKey: 'user_id'});
    Shoe.Activities = Shoe.hasMany(Activity, {foreignKey: 'shoe_id'});
  };

  return Shoe;
};
