'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wheels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wheels.init({
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    description: DataTypes.STRING(1024),
    price: DataTypes.NUMBER,
    image: DataTypes.STRING,
    shopifyId: DataTypes.STRING,
    anchors: DataTypes.JSON,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Wheels',
  });
  return Wheels;
};