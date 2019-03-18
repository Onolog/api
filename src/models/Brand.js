/* eslint-disable no-param-reassign */
module.exports = (sequelize, DataTypes) => {
  const BrandModel = sequelize.define('Brand', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'name',
    },
  }, {
    tableName: 'brands',
  });

  BrandModel.associate = ({ Brand, Shoe }) => {
    Brand.Shoes = Brand.hasMany(Shoe);
  };

  return BrandModel;
};
